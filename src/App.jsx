import { useState, useEffect, useRef } from "react";
import { FaCamera, FaPlusCircle, FaSmile, FaUserGraduate } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Header from "./Components/Header";
import { LuBot } from "react-icons/lu";
import { marked } from "marked";
import DOMPurify from "dompurify";
import './app.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [image, setImage] = useState(null); // State to store the selected image
  const messagesEndRef = useRef(null);

  const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAF4CnI8tGEqy3Blb9_2LDr10Rjy2Rqhug`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (content, sender, attachedImage = null) => {
    setMessages((prev) => [
      ...prev,
      { content, sender, attachedImage },
    ]);
  };

  const sendMessageToGemini = async (messages) => {
    const conversationHistory = messages
      .map((msg) => `${msg.sender === "user" ? "User" : "Bot"} ${msg.content}`)
      .join("\n");

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: conversationHistory }],
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
      const botResponse =
        data.candidates[0]?.content?.parts[0]?.text || "No response received.";

      return botResponse;
    } catch (error) {
      console.error("Request Error:", error);
      return "An error occurred while processing your request.";
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim() || image) {
      // Add the user's message to the chat
      addMessage(userInput, "user", image);
      setUserInput("");
      setTyping(true);

      let messageContent = userInput.trim();
      if (image) {
        // If there's an image, convert it to base64 and include it in the message
        const base64Image = await convertToBase64(image);
        messageContent += `\n[Image attached]\n${base64Image}`;
      }

      try {
        const reply = await sendMessageToGemini([
          ...messages,
          { content: messageContent, sender: "user", attachedImage: image },
        ]);

        const cleanedReply = reply.trim().startsWith("Bot:")
          ? reply.trim().replace(/^Bot:\s*/, "")
          : reply.trim();

        addMessage(cleanedReply, "bot");
      } catch (error) {
        console.error("Error fetching bot response:", error);
        addMessage("Something went wrong. Please try again later.", "bot");
      } finally {
        setTyping(false);
      }

      // Clear the selected image after sending the message
      setImage(null);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Set the selected image
    }
  };

  const handleCancelImage = () => {
    setImage(null); // Remove the selected image
  };

  return (
    <div className="bg-gray-100 flex w-full justify-center items-center m-0 p-0">
      <div className="chat-container min-h-screen w-full sm:max-w-full md:w-full bg-white border border-gray-300 rounded-lg shadow-md flex flex-col">
        <div className="sticky top-0 z-10 bg-blue-500">
          <Header />
        </div>

        <div
          className="messages flex-1 overflow-y-auto p-4 bg-gray-100 space-y-2"
          id="messages"
        >
          <div className="flex gap-2 mt-14 items-start">
            <LuBot className="text-White bg-base-200 border-2 p-1 rounded-md text-3xl" />
            <div className="max-w-[70%] p-3 rounded-lg shadow-md bg-gray-200 text-gray-900">
              Hello There,<br />
              How can I help you today?
            </div>
          </div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message flex items-start space-x-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`} // Changed to flex-col for vertical layout
            >
              {msg.sender === "bot" && (
                <LuBot className="text-White bg-base-200 border-2 p-1 rounded-md text-3xl" />
              )}
              <div
                className={`max-w-[70%] p-3 rounded-lg shadow-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(msg.content)) }}
              />
              <br />
              {msg.attachedImage && (
                <div className="mt-2"> {/* Wrap image with a div for margin */}
                  <img
                    src={
                      typeof msg.attachedImage === "string" && msg.attachedImage.startsWith("data:image")
                        ? msg.attachedImage // If it's a base64 image string
                        : typeof msg.attachedImage === "string"
                          ? msg.attachedImage // If it's a URL
                          : URL.createObjectURL(msg.attachedImage) // If it's a file object
                    }
                    alt="Attached"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
              )}

              {msg.sender === "user" && (
                <FaUserGraduate className="text-White bg-base-200 border-2 p-1 rounded-md text-3xl" />
              )}
            </div>
          ))}
          {typing && (
            <div className="flex items-center space-x-2">
              <LuBot className="text-White bg-base-200 border-2 p-1 rounded-md text-3xl" />
              <div className="bg-base-200 text-gray-900 p-3">
                <div className="typing-animation gap-1">
                  <span>○</span>
                  <span>○</span>
                  <span>○</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container flex justify-center py-3 bg-gray-50 border-t border-gray-300 gap-2 items-center my-2">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type here..."
            className="flex min-w-[50%] px-2 border border-gray-300 rounded-md  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 resize-none ml-8"
          />

          <div className="flex gap-5 p-[10px] border border-gray-300 rounded-full text-sm">
            <button className="text-blue-500 hover:text-blue-600 text-lg">
              <FaPlusCircle />
            </button>
            <button
              className="text-blue-500 hover:text-blue-600 text-lg"
              onClick={() => document.getElementById('fileInput').click()}
            >
              <FaCamera />
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </button>

            <button className="text-blue-500 hover:text-blue-600 text-lg">
              <FaSmile />
            </button>
          </div>
          {image && (
            <div className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="w-10 h-10 object-cover rounded-lg"
              />
              <button
                className="absolute bottom-7 left-8 -right-4 text-black rounded-full"
                onClick={handleCancelImage}
              >
                x
              </button>
            </div>
          )}
          <button
            id="sendBtn"
            onClick={handleSendMessage}
            className="bg-blue-500 px-3 py-2 mr-10 rounded-full text-white hover:text-white hover:bg-blue-600 text-lg"
          >
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
