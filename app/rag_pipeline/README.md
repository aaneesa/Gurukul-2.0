# 🚀 RAG Pipeline Integration Guide

This guide will help you set up and run your RAG (Retrieval-Augmented Generation) pipeline with the chatbot.

## 📋 Prerequisites

1. **Python 3.8+** installed
2. **Google API Key** for Gemini AI
3. **Node.js** for the backend
4. **MongoDB** running locally or remotely

## 🔧 Setup Steps

### 1. Install Python Dependencies

```bash
cd gurukul/app/rag_pipeline
pip install -r requirements.txt
```

### 2. Set Environment Variables

```bash
# Set your Google API key
export GOOGLE_API_KEY="your_google_api_key_here"

# Optional: Set RAG service port
export RAG_SERVICE_PORT=8000
```

### 3. Prepare Your Documents

Make sure you have text documents in the `output` folder. If not, run the ingestion process:

```bash
cd gurukul/app/rag_pipeline/langchain
python ingest.py
```

### 4. Start the RAG Service

```bash
cd gurukul/app/rag_pipeline/langchain
python start_rag_service.py
```

The service will start at `http://localhost:8000`

### 5. Install Backend Dependencies

```bash
cd gurukul/backend
npm install
```

### 6. Start the Backend Server

```bash
cd gurukul/backend
npm run dev
```

The backend will start at `http://localhost:5000`

### 7. Start the Frontend

```bash
cd gurukul
npm run dev
```

The frontend will start at `http://localhost:3000`

## 🧪 Testing the Integration

1. **Open your chatbot** at `http://localhost:3000/chatbot`
2. **Ask a question** in English about your study materials
3. **Get answers** in Hindi from your RAG system

## 🔍 Troubleshooting

### RAG Service Issues

- **Check if the service is running**: `curl http://localhost:8000/`
- **Verify Google API key**: Make sure `GOOGLE_API_KEY` is set
- **Check document ingestion**: Ensure you have documents in the `db` folder

### Backend Issues

- **Check MongoDB connection**: Ensure MongoDB is running
- **Verify dependencies**: Run `npm install` in the backend folder
- **Check logs**: Look for error messages in the console

### Frontend Issues

- **Check API routes**: Ensure `/api/chatbot/ask` is accessible
- **Verify backend connection**: Check if backend is running on port 5000

## 📁 File Structure

```
gurukul/
├── app/
│   ├── api/chatbot/ask/route.js    # Next.js API route
│   ├── chatbot/page.js             # Chatbot frontend
│   └── rag_pipeline/               # RAG pipeline
│       ├── langchain/
│       │   ├── rag_service.py      # FastAPI RAG service
│       │   ├── ingest.py           # Document ingestion
│       │   └── start_rag_service.py # Startup script
│       └── README.md               # This file
└── backend/
    ├── routes/
    │   ├── auth.js                 # Authentication routes
    │   └── chatbot.js              # Chatbot backend routes
    └── server.js                   # Main server file
```

## 🎯 How It Works

1. **User asks a question** in the chatbot frontend
2. **Frontend sends request** to `/api/chatbot/ask`
3. **Next.js API route** forwards request to backend
4. **Backend calls RAG service** at `http://localhost:8000/ask`
5. **RAG service processes** the question using your documents
6. **Answer is returned** in Hindi through the chain
7. **Response is displayed** in the chatbot interface

## 🚀 Next Steps

- [ ] Add conversation history to MongoDB
- [ ] Implement user authentication
- [ ] Add more document sources
- [ ] Optimize RAG performance
- [ ] Add analytics and monitoring

## 📞 Support

If you encounter issues:
1. Check the console logs
2. Verify all services are running
3. Ensure environment variables are set
4. Check the troubleshooting section above
