import React, { useState, useEffect, useRef } from "react";
import { FaCamera, FaPaperclip, FaPlusCircle, FaSmile } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Header from "./Components/Header";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);
  const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAF4CnI8tGEqy3Blb9_2LDr10Rjy2Rqhug`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (content, sender = "user") => {
    setMessages((prev) => [...prev, { content, sender }]);
  };

  const sendMessageToGemini = async (promptText) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptText }],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        return `Error: ${errorData.error.message}`;
      }

      const data = await response.json();
      console.log("API Response:", data);

      const botResponse =
        data.candidates[0]?.content?.parts[0]?.text || "No response received.";
      return botResponse;
    } catch (error) {
      console.error("Request Error:", error);
      return "An error occurred while processing your request.";
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      addMessage(userInput, "user");
      setUserInput("");

      const reply = await sendMessageToGemini(userInput);
      addMessage(reply, "bot");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-100 flex w-full justify-center items-center m-0 p-0">
      <div className="chat-container min-h-screen w-full  sm:max-w-full md:max-w-lg bg-white border border-gray-300 rounded-lg shadow-md flex flex-col ">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-blue-500">
          <Header />
        </div>


        {/* Messages */}
        <div
          className="messages flex-1 overflow-y-auto p-4 bg-gray-100 space-y-2"
          id="messages"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user"
                ? "outgoing flex justify-end"
                : "incoming flex justify-start"
                } items-center`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg shadow-md ${msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
                  }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="input-container flex p-3 bg-gray-50 border-t border-gray-300 gap-2 items-center">


          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <div className="flex gap-5 p-[10px] border border-gray-300 rounded-full text-sm">
            <button
              id="attachBtn"
              className="text-blue-500 hover:text-blue-600 text-lg"
            >
              <FaPlusCircle />
            </button>
            <button
              id="attachBtn"
              className="text-blue-500 hover:text-blue-600 text-lg"
            >
              <FaCamera />
            </button>

            <button
              id="emojiBtn"
              className="text-blue-500 hover:text-blue-600 text-lg"
            >
              <FaSmile />
            </button>

          </div>
          <button
            id="sendBtn"
            onClick={handleSendMessage}
            className="bg-blue-500 px-3 py-2  rounded-full text-white hover:text-white hover:bg-blue-600 text-lg"
          >
            <IoMdSend />
          </button>

        </div>
      </div>
    </div>
  );
};

export default App;
