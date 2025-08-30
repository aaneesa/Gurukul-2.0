#!/usr/bin/env python3
"""
Startup script for the RAG service
Run this to start your FastAPI RAG service
"""

import uvicorn
import os
import sys

# Add the langchain directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'langchain'))

from rag_service import app

if __name__ == "__main__":
    # Set default port
    port = int(os.getenv("RAG_SERVICE_PORT", 8000))
    
    print("🚀 Starting RAG Service...")
    print(f"📡 Service will be available at: http://localhost:{port}")
    print("🔑 Make sure you have set GOOGLE_API_KEY environment variable")
    print("📚 Make sure you have run the ingestion process first")
    print("=" * 50)
    
    # Start the service
    uvicorn.run(
        "rag_service:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )
