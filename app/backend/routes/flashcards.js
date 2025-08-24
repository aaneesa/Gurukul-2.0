const express = require('express');
const router = express.Router();
const Flashcard = require('../models/flashcard');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { generateFlashcards, getFlashcardsByChapter } = require('../controllers/apicontroller');

// Get flashcards for a chapter
router.get('/:chapterId', ClerkExpressRequireAuth(), getFlashcardsByChapter);

// Generate flashcards using AI
router.post('/generate', ClerkExpressRequireAuth(), generateFlashcards);

module.exports = router;