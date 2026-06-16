import UploadPDF from "../components/UploadPDF";

import ChatBox from "../components/ChatBox";

function Home() {

    return (

        <div>

            <h1>
                AI PDF Chatbot
            </h1>

            <UploadPDF />

            <hr />

            <ChatBox />

        </div>
    );
}

export default Home;