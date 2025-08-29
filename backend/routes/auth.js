const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Helper function to find user by userId or clerkUserId
async function getUser(req) {
  const { userId, clerkUserId } = req.body;
  if (!userId && !clerkUserId) return null;
  return clerkUserId ? User.findOne({ clerkUserId }) : User.findById(userId);
}

// Check redirect
router.post('/check-redirect', async (req, res) => {
  try {
    const user = await getUser(req);
    if (!user) return res.json({ shouldRedirect: true });

    if (user.shouldRedirect()) {
      await user.markAsVisited();
      return res.json({ shouldRedirect: true });
    }
    res.json({ shouldRedirect: false });
  } catch (err) {
    res.status(500).json({ error: 'Internal error' });
  }
});

// Clear redirect
router.post('/clear-redirect', async (req, res) => {
  try {
    const user = await getUser(req);
    if (user) await user.resetVisitStatus();
    res.json({ message: 'Redirect status cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Internal error' });
  }
});

// Sync user
router.post('/sync-user', async (req, res) => {
  try {
    const { clerkUserId, email, name } = req.body;
    if (!clerkUserId || !email || !name)
      return res.status(400).json({ error: 'Missing fields' });

    let user = await User.findOne({ clerkUserId });
    if (!user) {
      user = new User({ clerkUserId, email, name, hasVisited: false });
    } else {
      user.email = email;
      user.name = name;
    }
    await user.save();
    res.json({ message: 'User synced', shouldRedirect: user.shouldRedirect() });
  } catch (err) {
    res.status(500).json({ error: 'Internal error' });
  }
});

// Streak check-in
router.post('/streak-checkin', async (req, res) => {
  try {
    const user = await getUser(req);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!user.lastStreakDate) {
      user.streakCount = 1;
    } else {
      const last = new Date(user.lastStreakDate);
      last.setHours(0, 0, 0, 0);
      const diff = (today - last) / (24 * 60 * 60 * 1000);
      if (diff === 0) return res.json({ streakCount: user.streakCount, updated: false });
      user.streakCount = diff === 1 ? user.streakCount + 1 : 1;
    }
    user.lastStreakDate = today;
    await user.save();
    res.json({ streakCount: user.streakCount, updated: true });
  } catch (err) {
    res.status(500).json({ error: 'Internal error' });
  }
});

module.exports = router;
