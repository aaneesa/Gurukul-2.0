const express = require('express');
const router = express.Router();
const MCQ = require('../models/mcq');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { generateMCQs, getMCQsByChapter } = require('../controllers/apicontroller');
router.get('/:chapterId', ClerkExpressRequireAuth(), getMCQsByChapter);
router.post('/generate', ClerkExpressRequireAuth(), generateMCQs);

module.exports = router;