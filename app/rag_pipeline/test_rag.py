#!/usr/bin/env python3
"""
Test script for the RAG service
Run this to test if your RAG service is working correctly
"""

import requests
import json
import os

def test_rag_service():
    """Test the RAG service with a sample question"""
    
    # RAG service URL
    rag_url = "http://localhost:8000/ask"
    
    # Test question
    test_question = "What is nationalism?"
    
    print("🧪 Testing RAG Service...")
    print(f"📡 Service URL: {rag_url}")
    print(f"❓ Test Question: {test_question}")
    print("=" * 50)
    
    try:
        # Test the health endpoint first
        health_response = requests.get("http://localhost:8000/")
        if health_response.status_code == 200:
            print("✅ RAG service is running")
        else:
            print("❌ RAG service health check failed")
            return False
            
        # Test the ask endpoint
        payload = {"query": test_question}
        response = requests.post(rag_url, json=payload)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ RAG service responded successfully!")
            print(f"📝 Answer: {data.get('result', 'No answer')}")
            
            if data.get('source_documents'):
                print(f"📚 Sources: {len(data['source_documents'])} documents found")
                for i, doc in enumerate(data['source_documents'][:2]):
                    print(f"   Source {i+1}: {doc.get('metadata', {}).get('source', 'Unknown')}")
            else:
                print("⚠️  No source documents returned")
                
            return True
        else:
            print(f"❌ RAG service error: {response.status_code}")
            print(f"Error: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to RAG service")
        print("Make sure the service is running on http://localhost:8000")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def test_backend_integration():
    """Test the backend integration"""
    
    backend_url = "http://localhost:5000/api/chatbot/ask"
    test_question = "What is the meaning of democracy?"
    
    print("\n🧪 Testing Backend Integration...")
    print(f"📡 Backend URL: {backend_url}")
    print(f"❓ Test Question: {test_question}")
    print("=" * 50)
    
    try:
        payload = {"question": test_question}
        response = requests.post(backend_url, json=payload)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Backend integration working!")
            print(f"📝 Answer: {data.get('answer', 'No answer')}")
            return True
        else:
            print(f"❌ Backend error: {response.status_code}")
            print(f"Error: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to backend")
        print("Make sure the backend is running on http://localhost:5000")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    print("🚀 RAG Pipeline Integration Test")
    print("=" * 50)
    
    # Test RAG service
    rag_working = test_rag_service()
    
    # Test backend integration
    backend_working = test_backend_integration()
    
    print("\n" + "=" * 50)
    print("📊 Test Results:")
    print(f"RAG Service: {'✅ Working' if rag_working else '❌ Failed'}")
    print(f"Backend Integration: {'✅ Working' if backend_working else '❌ Failed'}")
    
    if rag_working and backend_working:
        print("\n🎉 All tests passed! Your RAG pipeline is ready to use.")
        print("Open your chatbot at http://localhost:3000/chatbot to start asking questions!")
    else:
        print("\n⚠️  Some tests failed. Check the setup guide for troubleshooting.")
