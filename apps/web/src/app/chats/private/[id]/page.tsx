"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const messages = [
  {
    id: 1,
    sender: "John Doe",
    text: "Hey, how are you?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    sender: "You",
    text: "I’m good, thanks! How about you?",
    timestamp: "10:31 AM",
  },
  {
    id: 3,
    sender: "John Doe",
    text: "Doing great! Just finished a project.",
    timestamp: "10:32 AM",
  },
  {
    id: 4,
    sender: "You",
    text: "That’s awesome! What’s next?",
    timestamp: "10:33 AM",
  },
];

export default function ChatPage({ params }: { params: { userId: number } }) {
  const { userId } = params; // Access the dynamic userId from the URL
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (e.g., new line)
      handleSendMessage(e); // Send the message
    }
  };

  const handleBackToChatList = () => {
    router.push("/"); // Navigate back to the Chat List Page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-48px)] flex flex-col">
        {/* Header with Back Button */}
        <div className="p-6 border-b flex items-center">
          <button
            onClick={handleBackToChatList}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">John Doe</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg ${
                  message.sender === "You"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 text-right text-gray-400">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown} // Add keydown event handler
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
