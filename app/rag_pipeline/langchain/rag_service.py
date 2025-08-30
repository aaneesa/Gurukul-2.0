from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

import os
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# --- Configuration ---
DB_PERSIST_DIRECTORY = "db"
EMBEDDING_MODEL = "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"

# Set your Google API Key (Best practice: use environment variables)
# Make sure to set this in your terminal before running: export GOOGLE_API_KEY="your_key"
if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY # Fallback if not set in env

# --- Define Request and Response Models for the API ---
class QueryRequest(BaseModel):
    query: str

class SourceDocument(BaseModel):
    page_content: str
    metadata: dict

class QueryResponse(BaseModel):
    result: str
    source_documents: List[SourceDocument]

# --- Initialize FastAPI App ---
app = FastAPI()

# --- Load RAG Components (Models, DB, Chain) ---
# This part is loaded once when the server starts
try:
    embedding_function = SentenceTransformerEmbeddings(model_name=EMBEDDING_MODEL)
    
    db = Chroma(
        persist_directory=DB_PERSIST_DIRECTORY, 
        embedding_function=embedding_function
    )
    
    retriever = db.as_retriever(search_kwargs={"k": 3})
    
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash-latest", temperature=0.2, convert_system_message_to_human=True)
    
    # --- The NEW English-to-Hindi Prompt ---
    # This is the magic part for your requirement.
    prompt_template = """
    You are a helpful AI assistant for students. Your task is to answer a student's question based on the provided context.
    The user's question will be in English. The context provided is in Hindi.
    You MUST provide your final answer in CLEAR, SIMPLE, and ACCURATE Hindi.
    Do not use any English in your final response, except for proper nouns (like names or places).
    If the context does not contain the answer, state in Hindi that you do not have enough information to answer.
    If user ask from mcqs from the chapter, generate them the number of questions they asked for with 4 multiple choice , if user asks for answer give them answer.

    CONTEXT: {context}

    QUESTION (in English): {question}

    ANSWER (in Hindi):
    """
    
    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )
    
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": PROMPT}
    )
    print("✅ RAG components loaded successfully.")

except Exception as e:
    print(f"❌ Error loading RAG components: {e}")
    qa_chain = None # Set to None if loading fails

# --- Define the API Endpoint ---
@app.post("/ask", response_model=QueryResponse)
async def ask_question(request: QueryRequest):
    if qa_chain is None:
        raise HTTPException(status_code=500, detail="RAG chain is not initialized. Check server logs.")
    
    query = request.query
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
        
    try:
        print(f"Received query: {query}")
        result = qa_chain({"query": query})
        print("Successfully processed query.")
        return result
    except Exception as e:
        print(f"❌ Error processing query: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "RAG Service is running"}