import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { MdScreenSearchDesktop } from "react-icons/md";
function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer(
      <center>
        <MdScreenSearchDesktop />
      </center>
    );
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBSpjnUgC37TP8H5Ytizx0suI_VSbb1fq0",
      method: "post",
      data: { contents: [{ parts: [{ text: question }] }] },
    });

    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  }

  return (
    <>
      <h1 className="bg-plum-300"> Chat AI</h1>
      <textarea
        className="border rounded w-full"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="10"
        placeholder="Ask anything to me..."
      ></textarea>
      <button onClick={generateAnswer}>
        Show Result{" "}
        <center>
          <MdScreenSearchDesktop />
        </center>
      </button>

      <p>
        {" "}
        <pre>{answer}</pre>
      </p>
    </>
  );
}

export default App;
