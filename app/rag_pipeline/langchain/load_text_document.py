from langchain_community.document_loaders import TextLoader
from langchain_core.documents import Document
from typing import List
import os

def load_txt_documents(txt_folder: str, subject: str, language: str) -> List[Document]:
    if not os.path.exists(txt_folder):
        raise FileNotFoundError(f"Folder not found: {txt_folder}")
    
    documents = []
    for filename in os.listdir(txt_folder):
        if filename.endswith(".txt"):
            file_path = os.path.join(txt_folder, filename)
            chapter_name = filename.replace(".txt", "")  # e.g., "chapter1"
            loader = TextLoader(file_path, encoding="utf-8")
            doc = loader.load()[0]  # TextLoader returns a single Document
            doc.metadata.update({
                "subject": subject,
                "chapter": chapter_name,
                "language": language,
                "source": file_path
            })
            documents.append(doc)
    
    return documents

# Example usage
if __name__ == "__main__":
    txt_folder = "../output"  # Matches your folder name
    subject = "History"
    language = "hindi"
    
    documents = load_txt_documents(txt_folder, subject, language)
    print(f"Loaded {len(documents)} documents")
    print("Sample document metadata:", documents[0].metadata)
    print("Sample document content (first 200 chars):", documents[0].page_content[:200]) 