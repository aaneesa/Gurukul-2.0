const express = require('express');
const router = express.Router();
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const {
  generateSummaryAudio,
  textToSpeech,
  speechToText
} = require('../controllers/apicontroller');

router.get('/chapter/:chapterId/summary-audio', ClerkExpressRequireAuth(), generateSummaryAudio);
router.post('/text-to-speech', ClerkExpressRequireAuth(), textToSpeech);
router.post('/speech-to-text', ClerkExpressRequireAuth(), speechToText);

module.exports = router;