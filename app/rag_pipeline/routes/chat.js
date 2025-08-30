const express = require('express');
const router = express.Router();
const axios = require('axios');

// This is the URL of your Python RAG service
const RAG_SERVICE_URL = 'http://127.0.0.1:8000/ask';

router.post('/ask', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required.' });
  }

  try {
    console.log(`Forwarding question to RAG service: ${question}`);

    // Make a POST request to the Python FastAPI service
    const ragResponse = await axios.post(RAG_SERVICE_URL, {
      query: question // The Python service expects an object with a 'query' key
    });

    // --- MongoDB Integration Point ---
    // This is the perfect place to save the conversation to MongoDB
    // For example:
    // const conversation = new Conversation({
    //   englishQuestion: question,
    //   hindiAnswer: ragResponse.data.result,
    //   source: ragResponse.data.source_documents[0].metadata.source
    // });
    // await conversation.save();
    // ---------------------------------

    // Send the response from the RAG service back to the React frontend
    res.status(200).json(ragResponse.data);

  } catch (error) {
    console.error('Error calling RAG service:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to get an answer from the AI service.' });
  }
});

module.exports = router;