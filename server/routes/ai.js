// import express from "express";
const express = require('express');
const {
  classifyTicket,
  callGemini,
  generateTroubleshootSteps,
} = require('../utils/serverAiHelpers');

const router = express.Router();

// Test classification endpoint
router.post("/classify", async (req, res) => {
  const { title, description } = req.body;
  const result = await classifyTicket(title, description);
  res.json(result);
});

// Test troubleshoot generation
router.post("/generate", async (req, res) => {
  const { title, description } = req.body;
  const steps = await generateTroubleshootSteps(title, description);
  res.json({ ok: true, steps });
});

// Raw Gemini prompt (for debugging)
router.post("/raw", async (req, res) => {
  const { prompt } = req.body;
  const result = await callGemini(prompt);
  res.json({ result });
});

module.exports = router;

