import os

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File

from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from pdf_loader import extract_text

from vectorstore import (
    create_chunks,
    create_vector_store
)

from rag import ask_question


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs(
    "uploads",
    exist_ok=True
)


class ChatRequest(BaseModel):
    question: str


@app.get("/")
def home():

    return {
        "message":
        "PDF Chatbot Running"
    }


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    try:

        file_path = os.path.join(
            "uploads",
            file.filename
        )

        with open(file_path, "wb") as f:
            f.write(await file.read())

        print("PDF SAVED")

        text = extract_text(file_path)

        print("TEXT LENGTH:", len(text))

        chunks = create_chunks(text)

        print("CHUNKS:", len(chunks))

        create_vector_store(chunks)

        print("FAISS INDEX CREATED")

        return {
            "message": "PDF uploaded successfully"
        }

    except Exception as e:

        print("UPLOAD ERROR:", e)

        return {
            "error": str(e)
        }
    
@app.post("/chat")
def chat(data: ChatRequest):

    try:

        answer = ask_question(
            data.question
        )

        return {
            "answer":
            answer
        }

    except Exception as e:

        return {
            "error":
            str(e)
        }