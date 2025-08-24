const express = require('express');
const router = express.Router();
const MCQ = require('../models/mcq');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { generateMCQs, getMCQsByChapter } = require('../controllers/apicontroller');

// Get MCQs for a chapter
router.get('/:chapterId', ClerkExpressRequireAuth(), getMCQsByChapter);

// Generate MCQs using AI
router.post('/generate', ClerkExpressRequireAuth(), generateMCQs);

module.exports = router;