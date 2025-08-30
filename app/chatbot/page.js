"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mic, Send, ArrowLeft, BookOpen, Loader2 } from "lucide-react";

const Chatbot = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const question = inputValue.trim();
    setInputValue("");
    
    // Add user message to conversation
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: question,
      timestamp: new Date()
    };
    
    setConversations(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send question to RAG system
      const response = await fetch('/api/chatbot/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (data.success) {
        // Add AI response to conversation
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.answer,
          sourceDocuments: data.sourceDocuments,
          timestamp: new Date()
        };
        
        setConversations(prev => [...prev, aiMessage]);
      } else {
        // Handle error with fallback
        const errorMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.fallbackAnswer || 'माफ़ करें, कुछ गलत हो गया।',
          isError: true,
          timestamp: new Date()
        };
        
        setConversations(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'माफ़ करें, कुछ गलत हो गया। कृपया फिर से कोशिश करें।',
        isError: true,
        timestamp: new Date()
      };
      
      setConversations(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen text-white bg-neutral-950 overflow-hidden relative">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition z-10"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="flex flex-col w-full h-full">
        {/* Header */}
        <div className="flex items-center justify-center p-4 border-b border-white/20">
          <h1 className="text-2xl font-bold">Gurukul AI Assistant</h1>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversations.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Ask me anything about your studies!</p>
              <p className="text-sm mt-2">I can help with questions, explanations, and more.</p>
            </div>
          )}
          
          {conversations.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.isError
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-800 text-gray-100'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                
                {/* Show source documents for AI responses */}
                {message.type === 'ai' && message.sourceDocuments && message.sourceDocuments.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <p className="text-xs text-white/70 mb-2">Sources:</p>
                    <div className="space-y-1">
                      {message.sourceDocuments.slice(0, 2).map((doc, idx) => (
                        <div key={idx} className="text-xs text-white/60 bg-white/10 p-2 rounded">
                          {doc.metadata?.source || `Document ${idx + 1}`}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-neutral-800 text-gray-100 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center bg-neutral-800 rounded-full px-4 py-3 border border-white/20">
            <input
              type="text"
              placeholder="Ask anything about your studies..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-grow bg-transparent outline-none text-gray-100 placeholder-gray-400 disabled:opacity-50"
            />

            {inputValue.trim() === "" ? (
              <Mic size={20} className="text-white ml-3 cursor-pointer opacity-50" />
            ) : (
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="ml-3 cursor-pointer disabled:opacity-50"
              >
                <Send size={20} className="text-white" />
              </button>
            )}
            
            <button className="ml-3 cursor-pointer opacity-50">
              <BookOpen size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;