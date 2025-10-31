// server/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../model/User');

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find().lean();
  res.json({ users });
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});


// Approve user
router.patch('/:id/approve', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { status: 'active' }, { new: true });
  res.json({ user });
});

// Reject user
router.patch('/:id/reject', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
  res.json({ user });
});

// Add skill (skilled user)
// Add skill
router.patch('/:id/skills/add', async (req, res) => {
  try {
    const { skill } = req.body;
    if (!skill) return res.status(400).json({ error: 'Skill required' });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const formattedSkill = skill.toLowerCase();
    if (!user.skills.includes(formattedSkill)) {
      user.skills.push(formattedSkill);
      await user.save();
    }

    return res.json(user);
  } catch (err) {
    console.error("Error adding skill:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove skill
router.patch('/:id/skills/remove', async (req, res) => {
  try {
    const { skill } = req.body;
    if (!skill) return res.status(400).json({ error: 'Skill required' });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const formattedSkill = skill.toLowerCase();
    user.skills = (user.skills || []).filter(s => s.toLowerCase() !== formattedSkill);
    await user.save();

    return res.json(user);
  } catch (err) {
    console.error("Error removing skill:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
