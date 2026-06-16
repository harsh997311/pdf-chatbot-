import { useState } from "react";
import { askQuestion } from "../services/api";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    try {
      const response = await askQuestion(question);

      console.log(response.data);

      setAnswer(
        response.data.answer ||
        response.data.error ||
        "No response received"
      );
    } catch (error) {
      console.error(error);

      setAnswer(
        error.response?.data?.error ||
        error.message
      );
    }
  };

  return (
    <div>
      <h2>Ask Question</h2>

      <input
        type="text"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask something..."
      />

      <button onClick={handleAsk}>
        Ask
      </button>

      <h3>Answer:</h3>

      <p>{answer}</p>
    </div>
  );
}

export default ChatBox;