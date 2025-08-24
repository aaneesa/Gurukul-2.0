const express = require('express');
const router = express.Router();
const Chapter = require('../models/chapters');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

router.use(ClerkExpressRequireAuth());

router.get('/:chapterId', async (req, res) => {
  try {
    const { chapterId } = req.params;
    const chapter = await Chapter.findById(chapterId)
      .populate('bookId', 'title stateBoard language subject grade');
    
    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }
    
    res.json({ success: true, data: chapter });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching chapter details' });
  }
});

module.exports = router;