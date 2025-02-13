"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export default function ChatPage() {
  const { data: session } = useSession(); // Get the logged-in user's session
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const router = useRouter();

  // Connect to the WebSocket server
  useEffect(() => {
    if (!session) return; // Only connect if the user is logged in

    // Initialize WebSocket connection
    ws.current = new WebSocket(`ws://localhost:8080?userId=${session.user?.id}`);

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      console.log("Received message:", messageData);

      // Add the new message to the messages list
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          sender: messageData.sender,
          text: messageData.text,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [session]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && ws.current && session?.user) {
      const messageData = {
        type: "group",
        sender: session.user.name || "Anonymous",
        text: newMessage,
      };
  
      // Send the message via WebSocket
      ws.current.send(JSON.stringify(messageData));
  
      // Manually add the message to state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          sender: session.user!.name || "Anonymous",
          text: newMessage,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
  
      // Clear the input field
      setNewMessage("");
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Navigate back to the chat list
  const handleBackToChatList = () => {
    router.push("/");
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
            <h2 className="text-3xl font-bold text-gray-800">Public Chat Group</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === session?.user?.name
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg ${
                  message.sender === session?.user?.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm font-extralight text-gray-500">{message.sender}</p>
                <p className="text-base">{message.text}</p>
                <p className="text-xs mt-1 text-right text-gray-400">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-6 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
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