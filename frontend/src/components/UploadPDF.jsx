import { uploadPDF } from "../services/api";

function UploadPDF() {

    const handleUpload = async (event) => {

        const file = event.target.files[0];

        if (!file) return;

        try {

            await uploadPDF(file);

            alert("PDF Uploaded Successfully");

        } catch (error) {

            console.error(error);

            alert("Upload Failed");
        }
    };

    return (

        <div>

            <h2>Upload PDF</h2>

            <input
                type="file"
                accept=".pdf"
                onChange={handleUpload}
            />

        </div>
    );
}

export default UploadPDF;