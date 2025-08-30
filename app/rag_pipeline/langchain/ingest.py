import os
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from load_text_document import load_txt_documents # Importing your function

# --- Configuration ---
TXT_FOLDER_PATH = "../output"
DB_PERSIST_DIRECTORY = "db" # Where the vector database will be stored
EMBEDDING_MODEL = "sentence-transformers/paraphrase-multilingual-mpnet-base-v2" # Good for Hindi

def create_vector_db():
    print("--- Starting Ingestion Process ---")

    # 1. Load your documents using your function
    # For now, we'll hardcode the subject for simplicity
    documents = load_txt_documents(TXT_FOLDER_PATH, subject="History", language="hindi")
    if not documents:
        print("No documents found. Exiting.")
        return
    print(f"Loaded {len(documents)} document(s).")

    # 2. Split the documents into smaller chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,  # Max size of a chunk
        chunk_overlap=50   # Overlap between chunks
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Split documents into {len(chunks)} chunks.")

    # 3. Create embeddings and store in ChromaDB
    # This model is good for multiple languages, including Hindi
    print(f"Loading embedding model: {EMBEDDING_MODEL}")
    embedding_function = SentenceTransformerEmbeddings(model_name=EMBEDDING_MODEL)
    
    print(f"Creating and persisting vector store in '{DB_PERSIST_DIRECTORY}'...")
    # This single line creates embeddings and stores them in the database
    db = Chroma.from_documents(
        chunks, 
        embedding_function, 
        persist_directory=DB_PERSIST_DIRECTORY
    )
    
    print("--- Ingestion Complete! ---")
    print(f"Vector store created with {db._collection.count()} vectors.")

if __name__ == "__main__":
    create_vector_db()