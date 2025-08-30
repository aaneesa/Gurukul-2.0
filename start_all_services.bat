@echo off
echo 🚀 Starting Gurukul AI Services...
echo ==================================

echo 📋 Starting services in the following order:
echo 1. RAG Service (Python FastAPI) - Port 8000
echo 2. Backend Server (Node.js) - Port 5000
echo 3. Frontend (Next.js) - Port 3000
echo.

REM Start RAG Service
echo 🐍 Starting RAG Service...
cd app\rag_pipeline\langchain
start "RAG Service" python start_rag_service.py

REM Wait a bit for RAG service to start
timeout /t 3 /nobreak >nul

REM Start Backend
echo 🟢 Starting Backend Server...
cd ..\..\..\backend
start "Backend Server" npm run dev

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start Frontend
echo ⚛️ Starting Frontend...
cd ..
start "Frontend" npm run dev

echo.
echo 🎉 All services started!
echo ==================================
echo 📡 RAG Service: http://localhost:8000
echo 🔧 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:3000
echo 🤖 Chatbot: http://localhost:3000/chatbot
echo.
echo 💡 Close the command windows to stop the services
echo.
pause
