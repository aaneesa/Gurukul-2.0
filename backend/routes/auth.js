const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.post('/check-redirect', async (req, res) => {
  try {
    const { userId, clerkUserId } = req.body;
    
    if (!userId && !clerkUserId) {
      return res.status(400).json({ error: 'User ID or Clerk User ID is required' });
    }
    let user;
    if (clerkUserId) {
      user = await User.findOne({ clerkUserId });
    } else {
      user = await User.findById(userId);
    }
    if (!user) {
      return res.json({ shouldRedirect: true });
    }
    if (user.shouldRedirect()) {
      await user.markAsVisited();
      
      return res.json({ shouldRedirect: true });
    }
    
    return res.json({ shouldRedirect: false });
    
  } catch (error) {
    console.error('Error checking redirect status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/clear-redirect', async (req, res) => {
  try {
    const { userId, clerkUserId } = req.body;
    
    if (!userId && !clerkUserId) {
      return res.status(400).json({ error: 'User ID or Clerk User ID is required' });
    }
    let user;
    if (clerkUserId) {
      user = await User.findOne({ clerkUserId });
    } else {
      user = await User.findById(userId);
    }
    
    if (user) {
      await user.resetVisitStatus();
    }
    
    res.json({ message: 'Redirect status cleared' });
    
  } catch (error) {
    console.error('Error clearing redirect status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/sync-user', async (req, res) => {
  try {
    const { clerkUserId, email, name } = req.body;
    
    if (!clerkUserId || !email || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    let user = await User.findOne({ clerkUserId });
    
    if (!user) {
      // Create new user
      user = new User({
        clerkUserId,
        email,
        name,
        hasVisited: false, 
      });
    } else {
      // Update existing user
      user.email = email;
      user.name = name;
    }
    
    await user.save();
    
    res.json({ 
      message: 'User synced successfully',
      shouldRedirect: user.shouldRedirect()
    });
    
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
