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
    if (!question.trim()) return; // Prevent empty input submission

    setAnswer(
      <center>
        <MdScreenSearchDesktop />
      </center>
    );

    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      method: "post",
      data: { contents: [{ parts: [{ text: question }] }] },
    });

    setAnswer(response.data.candidates[0].content.parts[0].text);
  }

  // Handle Enter key press
  function handleKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      generateAnswer();
    }
  }

  return (
    <div className="container">
      <h1>AI-CHAT</h1>

      <textarea
        className="input-box"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyPress}
        cols="30"
        rows="5"
        placeholder="Ask anything to me..."
      ></textarea>

      <button onClick={generateAnswer}>
        Show Result{" "}
        <center>
          <MdScreenSearchDesktop />
        </center>
      </button>

      <div className="result-container">{answer}</div>
    </div>
  );
}

export default App;
