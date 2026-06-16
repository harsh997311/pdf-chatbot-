import { useState } from "react";
import axios from "axios";

export default function UploadPDF() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8000/upload",
        formData
      );

      alert("PDF uploaded successfully");
    } catch (err) {
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Upload PDF</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadFile}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}