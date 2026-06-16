from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from embeddings import get_embeddings


def create_chunks(text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    return splitter.split_text(text)


def create_vector_store(chunks):
    embeddings = get_embeddings()

    db = FAISS.from_texts(
        chunks,
        embeddings
    )

    db.save_local("faiss_index")
    return db


def load_vector_store():
    embeddings = get_embeddings()

    return FAISS.load_local(
        "faiss_index",
        embeddings,
        allow_dangerous_deserialization=True
    )