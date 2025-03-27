import React, { useState } from "react";
import { OpenAI } from "openai";
import TreeDiagram from "./diagram"; // Import the TreeDiagram component
import "./chat.css";

const ChatInterface = () => {
  // const [inputText, setInputText] = useState("");
  const [profession, setProfession] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState(null); // State to store the study plan
  const [prompt, setPrompt] = useState("");

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: "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", // Replace with your OpenAI API key
    dangerouslyAllowBrowser: true, 
  });

  // Function to send a message to OpenAI
  const sendMessage = async () => {
    if (!profession.trim() || !selectedProfession.trim() || !prompt.trim() || !selectedLevel.trim()) return;

    setIsLoading(true);

    // Format the input text
    const formattedInputText = `I'm ${profession}, I want to become ${selectedProfession}, my level is for that profession ${selectedLevel}, ${prompt} (- this text should be secondary than other fialds) (answer by json format), in answer should be only json (example of answer - {name: "", children: [{name: "", children: [{e.t.c}]}]}), don't use long words in answer, mimium depth 4.`;

    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: formattedInputText },
    ]);

    try {
      // Send the message to OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Use the GPT-3.5 Turbo model
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...messages,
          { role: "user", content: formattedInputText },
        ],
      });

      // Add the assistant's response to the chat
      const responseText = completion.choices[0].message.content;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: responseText },
      ]);

      // Parse the response JSON and set the study plan
      const responseJson = JSON.parse(responseText);
      setStudyPlan(responseJson);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "An error occurred. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      // setInputText("");
    }
  };

  return (
    <>
    <div className="chat-interface">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <div>
          <label>
            <span className="profession">Your Profession:</span>
            <textarea
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
              className="profession-input"
            />
          </label>
        </div>
        <div>
          <label className="prompt-label">
            <span className="prompt">Prompt:</span>
            <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
              placeholder="I'm a career changer, I want to become a..."
              className="prompt-input"
            />
          </label>
        </div>
        <div>
          <label>
            <span className="future-profession">Profession You Want to Become:</span>
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              required
              className="future-profession-select"
            >
              <option value="">Select a profession</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Designer">Designer</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            <span className="knowledge-level">Your Knowledge Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              required
              className="knowledge-level-select"
            >
              <option value="">Select your knowledge level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </label>
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </form>
      {/* <div>
        {messages.map((message, index) => (
          <div key={index} className={message.role}>
            <strong>{message.role}:</strong> {message.content}
          </div>
        ))}
      </div> */}
       {/* Render TreeDiagram with the study plan */}
    </div>
    {studyPlan && 
    <div style={{position: "absolute", top: "130%", width: "100%"}}>
     <div style={{width: "100%", height: "80px", backgroundColor: "yellow", display: "flex", justifyContent: "center", alignItems: "center"}}> <h2>Generated road map for YOU</h2></div>
    <TreeDiagram data={studyPlan} />
    </div>
    }
    </>
  );
};

export default ChatInterface;