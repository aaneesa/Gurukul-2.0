const express = require('express');
const router = express.Router();
const axios = require('axios');

// This is the URL of your Python RAG service
const RAG_SERVICE_URL = process.env.RAG_SERVICE_URL || 'http://127.0.0.1:8000/ask';

// Chatbot route to ask questions
router.post('/ask', async (req, res) => {
  const { question, userId } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required.' });
  }

  try {
    console.log(`User ${userId || 'anonymous'} asked: ${question}`);

    // Make a POST request to the Python FastAPI RAG service
    const ragResponse = await axios.post(RAG_SERVICE_URL, {
      query: question // The Python service expects an object with a 'query' key
    });

    // Extract the response data
    const { result, source_documents } = ragResponse.data;

    // TODO: Save conversation to MongoDB if available
    // For now, just log the conversation
    console.log(`✅ Question answered successfully: ${question.substring(0, 50)}...`);

    // Send the response from the RAG service back to the frontend
    res.status(200).json({
      success: true,
      answer: result,
      sourceDocuments: source_documents,
      question: question
    });

  } catch (error) {
    console.error('Error calling RAG service:', error.response ? error.response.data : error.message);
    
    // If RAG service is down, provide a fallback response
    res.status(500).json({ 
      success: false,
      error: 'Failed to get an answer from the AI service.',
      fallbackAnswer: 'माफ़ करें, अभी AI सेवा उपलब्ध नहीं है। कृपया कुछ देर बाद फिर से कोशिश करें।'
    });
  }
});

// Get chat history for a user
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // TODO: Implement chat history retrieval from MongoDB when available
    // For now, return empty array
    res.json({ 
      conversations: [],
      message: "Chat history not available (MongoDB not connected)"
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

module.exports = router;
