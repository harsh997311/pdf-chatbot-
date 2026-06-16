import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const uploadPDF = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    return axios.post(
        `${BASE_URL}/upload`,
        formData
    );
};

export const askQuestion = async (question) => {

    return axios.post(
        `${BASE_URL}/chat`,
        {
            question: question
        }
    );
};