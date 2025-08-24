// routes/api.js
const express = require('express');
const router = express.Router();
const { clerkExpressRequiredAuth } = require('@clerk/clerk-sdk-node');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getChapterById,
  getChaptersByBook,
  getUserProgress,
  handleUserLogin,
  generateMCQs,
  generateFlashcards,
  handleAIChat,
  getMCQsByChapter,
  getFlashcardsByChapter,
  updateUserProgress,
  generateSummaryAudio,
  textToSpeech,
  speechToText
} = require('../controllers/apiController');
router.use(clerkExpressRequiredAuth());

router.route('/books')
  .get(getAllBooks)
  .post(createBook);

router.route('/books/:id')
  .get(getBookById)
  .put(updateBook)
  .delete(deleteBook);

router.get('/chapters/:chapterId', getChapterById);
router.get('/chapters/by-book/:bookId', getChaptersByBook);
router.post('/mcqs/generate', generateMCQs);
router.get('/mcqs/by-chapter/:chapterId', getMCQsByChapter);

router.post('/flashcards/generate', generateFlashcards);
router.get('/flashcards/by-chapter/:chapterId', getFlashcardsByChapter);

router.post('/ai/chat', handleAIChat);
router.get('/users/progress', getUserProgress);
router.post('/users/login', handleUserLogin);
router.put('/users/progress', updateUserProgress); 
router.get('/audio/chapter/:chapterId/summary-audio', generateSummaryAudio);
router.post('/audio/text-to-speech', textToSpeech);
router.post('/audio/speech-to-text', speechToText);

module.exports = router;