import UploadPDF from "../components/UploadPDF";
import ChatBox from "../components/ChatBox";

export default function Home() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>📄 PDF Assistant</h2>

        <div className="sidebar-card">
          <h3>Features</h3>

          <ul>
            <li>Ask Questions</li>
            <li>Summarize PDF</li>
            <li>Extract Key Points</li>
            <li>AI Chat</li>
          </ul>
        </div>
      </aside>

      <main className="content">
        <header className="header">
          <h1>AI PDF Chatbot</h1>
          <p>Chat with your PDFs using AI</p>
        </header>

        <UploadPDF />

        <ChatBox />
      </main>
    </div>
  );
}