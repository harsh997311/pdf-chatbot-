import os

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

from vectorstore import load_vector_store

load_dotenv()


def ask_question(question):
    db = load_vector_store()

    docs = db.similarity_search(question,k=3)
    

    context = "\n".join([doc.page_content for doc in docs])
 

    llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    google_api_key=os.getenv("GOOGLE_API_KEY"),
    temperature=0
)

    prompt = f"""
    Context:
    {context}

    Question:
    {question}

    Answer using only the provided context.
    """

    response = llm.invoke(prompt)

    return response.content