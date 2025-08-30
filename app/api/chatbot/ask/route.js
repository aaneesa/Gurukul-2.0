import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Forward the request to the backend
    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:5001'}/api/chatbot/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in chatbot API route:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process chatbot request',
        fallbackAnswer: 'माफ़ करें, अभी AI सेवा उपलब्ध नहीं है। कृपया कुछ देर बाद फिर से कोशिश करें।'
      },
      { status: 500 }
    );
  }
}
