const express = require('express');
const router = express.Router();
const bookRoutes = require('./books');
const chapterRoutes = require('./chapters');
const mcqRoutes = require('./mcqs');
const flashcardRoutes = require('./flashcards');
const userRoutes = require('./users');
const aiRoutes = require('./ai');
const audioRoutes = require('./audio');
router.use('/books', bookRoutes);
router.use('/chapters', chapterRoutes);
router.use('/mcqs', mcqRoutes);
router.use('/flashcards', flashcardRoutes);
router.use('/users', userRoutes);
router.use('/ai', aiRoutes);
router.use('/audio', audioRoutes);
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Gurukul 2.0 Backend is running!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

