const express = require('express');
const router = express.Router();
const Ticket = require('../model/Ticket');
const User = require('../model/User');
const {
  classifyTicket,
  callGemini,
  assignBestAgent,
  generateTroubleshootSteps,
} = require('../utils/serverAiHelpers');

// ✅ Create ticket (auto-classify, AI description, assign skilled agent)
router.post('/', async (req, res) => {
  try {
    console.log("🧾 Incoming Ticket Body:", req.body);

    const { title, description, customerEmail, customerName, createdBy } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Step 1: AI classification (or fallback)
    const { category, priority } = await classifyTicket(title, description || "");

    // Step 2: Skill mapping based on category
    const skillMap = {
      Billing: ['payment', 'invoice', 'refund'],
      Authentication: ['login', 'auth', 'account'],
      'Technical Issue': ['bug', 'error', 'crash'],
      'Feature Request': ['feature', 'enhancement'],
      General: ['support', 'help'],
    };
    const requiredSkills = skillMap[category] || ['general'];

    // Step 3: Assign the best available skilled agent
    const agent = await assignBestAgent(requiredSkills);

    // Step 4: Generate AI description (summary of issue)
    const aiDescription = await callGemini(
      `Write a short and simple problem description for a support ticket titled "${title}". 
       Keep it concise and clear for a technical support agent. Make sure not to mentioned something like "Option 1 , 2 ,etc". Instead just give me the description and some necessary bullet points for user understanding. Don't mention something like "
       Here's a concise problem description for 
       ". Follow the below format :

       **Problem Description**:


**Details**:

**Action Affected**: 
**Error Message**: 
**Reproducibility**: 
**Environment Details** (please provide):

       ". FOllow THE STRICT FORMAT AND GIVE ME ALL THE PARAMS POSSIBLE. `
    );

    // Step 5: Generate AI troubleshoot steps (short list of 5 steps)
    const troubleshootSteps = await generateTroubleshootSteps(title);

    // Step 6: Identify the creator (optional)
    const creator = createdBy ? await User.findById(createdBy) : null;

    // Step 7: Create and save the ticket
    const newTicket = await Ticket.create({
      title,
      description: aiDescription || "AI description unavailable.",
      customerEmail,
      customerName,
      category: category || "General",
      priority: priority || "Medium",
      status: 'open',
      assignedTo: agent?._id || null,
      assignedToName: agent?.name || "Unassigned",
      createdBy: creator?._id || null,
      createdByName: creator?.name || null,
      troubleshootSteps,
      escalationRisk: "low",
    });

    res.status(201).json({
      message: '✅ Ticket created successfully with AI assistance',
      ticket: newTicket,
    });
  } catch (err) {
    console.error('❌ Error creating ticket:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// ✅ Keep your other routes intact below this
// Get list (with optional filtering & sorting via query params)
router.get('/', async (req, res) => {
  try {
    const { role, userId, status, category, search, sortBy, sortDir } = req.query;

    let filter = {};
    if (role === 'sales') filter.createdBy = userId;
    if (role === 'skilled') filter.assignedTo = userId;
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search)
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
      ];

    let query = Ticket.find(filter).sort({ createdAt: sortDir === 'asc' ? 1 : -1 });
    if (sortBy) {
      const dir = sortDir === 'asc' ? 1 : -1;
      query = Ticket.find(filter).sort({ [sortBy]: dir });
    }

    const tickets = await query.exec();
    res.json({ tickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ ticket });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Reassign
router.patch('/:id/reassign', async (req, res) => {
  try {
    const { id } = req.params;
    const { newAgentId } = req.body;
    const agent = await User.findById(newAgentId);
    if (!agent) return res.status(400).json({ error: 'Agent not found' });
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { assignedTo: agent._id, assignedToName: agent.name },
      { new: true }
    );
    res.json({ ticket });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Generate AI-based description & troubleshoot steps for an existing ticket
router.post('/:id/ai-details', async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    // Generate description using Gemini
    const aiDescription = await callGemini(
      `Write a detailed problem description for this support ticket titled: "${ticket.title}".`
    );

    // Generate troubleshoot steps
    const troubleshootSteps = await generateTroubleshootSteps(ticket.title, aiDescription);

    // Update the ticket
    ticket.description = aiDescription || "AI description unavailable.";
    ticket.troubleshootSteps = troubleshootSteps;
    await ticket.save();

    res.status(200).json({
      message: "AI details generated successfully",
      ticket,
    });
  } catch (err) {
    console.error("AI Details Error:", err.message);
    res.status(500).json({ error: "Failed to generate AI details" });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
