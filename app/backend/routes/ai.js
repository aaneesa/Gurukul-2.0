const express = require('express');
const router = express.Router();
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { 
  handleAIChat, 
  generateSummaryAudio, 
  textToSpeech, 
  speechToText 
} = require('../controllers/apicontroller');

// AI Chat for student doubts
router.post('/chat', ClerkExpressRequireAuth(), handleAIChat);

// Generate audio summary for chapter
router.get('/audio/summary/:chapterId', ClerkExpressRequireAuth(), generateSummaryAudio);

// Text to Speech conversion
router.post('/tts', ClerkExpressRequireAuth(), textToSpeech);

// Speech to Text conversion
router.post('/stt', ClerkExpressRequireAuth(), speechToText);

module.exports = router;
