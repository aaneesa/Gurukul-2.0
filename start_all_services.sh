#!/bin/bash

echo "🚀 Starting Gurukul AI Services..."
echo "=================================="

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "✅ Port $1 is available"
        return 0
    else
        echo "❌ Port $1 is already in use"
        return 1
    fi
}

# Check if ports are available
echo "🔍 Checking ports..."
check_port 8000 || exit 1  # RAG service
check_port 5000 || exit 1  # Backend
check_port 3000 || exit 1  # Frontend

echo ""
echo "📋 Starting services in the following order:"
echo "1. RAG Service (Python FastAPI) - Port 8000"
echo "2. Backend Server (Node.js) - Port 5000"
echo "3. Frontend (Next.js) - Port 3000"
echo ""

# Start RAG Service
echo "🐍 Starting RAG Service..."
cd app/rag_pipeline/langchain
python start_rag_service.py &
RAG_PID=$!
echo "RAG Service started with PID: $RAG_PID"

# Wait a bit for RAG service to start
sleep 3

# Start Backend
echo "🟢 Starting Backend Server..."
cd ../../../backend
npm run dev &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"

# Wait a bit for backend to start
sleep 3

# Start Frontend
echo "⚛️  Starting Frontend..."
cd ..
npm run dev &
FRONTEND_PID=$!
echo "Frontend started with PID: $FRONTEND_PID"

echo ""
echo "🎉 All services started!"
echo "=================================="
echo "📡 RAG Service: http://localhost:8000"
echo "🔧 Backend: http://localhost:5000"
echo "🌐 Frontend: http://localhost:3000"
echo "🤖 Chatbot: http://localhost:3000/chatbot"
echo ""
echo "💡 To stop all services, run: pkill -f 'python start_rag_service.py' && pkill -f 'npm run dev'"
echo ""

# Wait for user input to stop services
read -p "Press Enter to stop all services..."

echo "🛑 Stopping all services..."
kill $RAG_PID 2>/dev/null
kill $BACKEND_PID 2>/dev/null
kill $FRONTEND_PID 2>/dev/null

echo "✅ All services stopped!"
