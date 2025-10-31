// server/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../model/User');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const user = await User.create({
      name, email, password, role,
      status: 'pending',
      skills: []
    });
    res.json({ user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    if (user.status === 'pending') return res.status(403).json({ error: 'pending' });
    if (user.status === 'rejected') return res.status(403).json({ error: 'rejected' });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
