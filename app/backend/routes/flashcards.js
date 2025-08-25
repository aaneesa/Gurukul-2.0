const express = require('express');
const router = express.Router();
const Flashcard = require('../models/flashcard');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { generateFlashcards, getFlashcardsByChapter } = require('../controllers/apicontroller');
router.get('/:chapterId', ClerkExpressRequireAuth(), getFlashcardsByChapter);
router.post('/generate', ClerkExpressRequireAuth(), generateFlashcards);

module.exports = router;