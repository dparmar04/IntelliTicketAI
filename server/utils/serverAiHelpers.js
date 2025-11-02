// const fetch = require('node-fetch');
const User = require('../model/User');

// ✅ Safe fetch import for all Node versions
let fetchFn;
try {
  fetchFn = fetch; // Use global fetch if available
} catch {
  fetchFn = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
}


/**
 * Calls Gemini API with a given prompt and returns text response
 */
async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const useGemini = process.env.USE_GEMINI === "true";

  if (!useGemini || !apiKey) {
    console.warn("⚠️ Gemini disabled or missing key — using fallback logic.");
    return null;
  }

  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  try {
    // ✅ node-fetch explicitly imported above
    const response = await fetchFn(`${url}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content?.parts?.[0]?.data ||
      data?.output ||
      "";

    return text.trim();
  } catch (err) {
    console.error("❌ Gemini API error:", err.message);
    return null;
  }
}


/**
 * Classifies a ticket into category and priority (local or Gemini)
 */
async function classifyTicket(title, description) {
  const text = `${title} ${description}`.toLowerCase();

  // Simple keyword-based fallback classification
  if (text.includes("payment")) return { category: "Billing", priority: "High" };
  if (text.includes("login") || text.includes("auth"))
    return { category: "Authentication", priority: "Medium" };
  if (text.includes("bug") || text.includes("error"))
    return { category: "Technical Issue", priority: "High" };
  if (text.includes("feature") || text.includes("request"))
    return { category: "Feature Request", priority: "Low" };

  // If Gemini available — use AI-based classification
  const prompt = `Classify this support ticket. 
  Title: "${title}"
  Description: "${description}"
  Return category and priority in JSON format like:
  {"category": "...", "priority": "High|Medium|Low"}`;

  const result = await callGemini(prompt);
  try {
    const json = JSON.parse(result);
    return json;
  } catch {
    return { category: "General", priority: "Medium" };
  }
}

/**
 * Finds the best skilled agent based on required skills
 */
async function assignBestAgent(requiredSkills = []) {
  try {
    const agents = await User.find({ role: "skilled", status: "active" });

    if (!agents || agents.length === 0) {
      console.warn("⚠️ No active skilled agents found.");
      return null;
    }

    // Normalize required skills for case-insensitive matching
    const required = requiredSkills.map(s => s.toLowerCase());

    // Score each agent based on matched skills
    const scoredAgents = agents.map(agent => {
      const userSkills = (agent.skills || []).map(s => s.toLowerCase());
      const matches = userSkills.filter(s => required.includes(s)).length;
      return { agent, score: matches };
    });

    // Sort by best match (descending)
    scoredAgents.sort((a, b) => b.score - a.score);

    // Debug: log skill matching

    scoredAgents.forEach(({ agent, score }) => {
      console.log(` - ${agent.name}: score ${score}, skills: ${agent.skills}`);
    });

    // Pick agent with highest score, or random fallback
    const best = scoredAgents[0];
    if (best.score === 0) {
      // console.warn("⚠️ No matching skills found — assigning random skilled agent.");
      return agents[Math.floor(Math.random() * agents.length)];
    }

    return best.agent;
  } catch (err) {
    console.error("Error assigning agent:", err.message);
    return null;
  }
}


/**
 * Generates AI-based troubleshoot steps or fallback
 */
async function generateTroubleshootSteps(title, description = "") {
  const prompt = `You are a customer support AI.
  Based on the following issue, generate 5 short and clear troubleshooting steps.

  Title: ${title}
  Description: ${description}
  Return the list as bullet points.`;

  const result = await callGemini(prompt);

  if (!result) {
    return [
      "Check if the issue persists after restarting the system.",
      "Verify network or connectivity.",
      "Ensure credentials or inputs are correct.",
      "Reproduce the error and note steps.",
      "Escalate if problem continues.",
    ];
  }

  return result.split("\n").filter((line) => line.trim());
}

module.exports = {
  callGemini,
  classifyTicket,
  assignBestAgent,
  generateTroubleshootSteps,
};