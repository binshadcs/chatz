"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface Message {
  id: string;
  type: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export default function ChatPage({ params }: { params: { userId: string } }) {
  const { userId } = params; // Receiver's ID
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Unknown";
  const router = useRouter();
  const { data: session } = useSession();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!session?.user?.id) {
      router.push("/auth/signin");
      return;
    }

    // Connect to WebSocket server with user ID
    const ws = new WebSocket(`ws://localhost:8080?userId=${session.user.id}`);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        if (messageData.type === "group") {
          const newMessage: Message = {
            id: crypto.randomUUID(),
            type: messageData.type,
            senderId: messageData.senderId || session.user!.id,
            text: messageData.text,
            timestamp: new Date().toISOString()
          };
          
          setMessages(prev => [...prev, newMessage]);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    setWsConnection(ws);

    // Clean up on unmount
    return () => {
      ws.close();
    };
  }, [session, userId, router]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !wsConnection || !session?.user?.id) return;

    const messageData = {
      type: "group",
      senderId: session.user!.id,
      text: newMessage,
      receiverId: userId, // Include receiver ID even though server broadcasts to all
      timestamp: new Date().toISOString()
    };

    wsConnection.send(JSON.stringify(messageData));
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const isCurrentUser = (senderId: string) => {
    return senderId === session?.user?.id;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-48px)] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex items-center">
          <button
            onClick={() => router.push("/")}
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
            <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${isCurrentUser(message.senderId) ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg ${
                  isCurrentUser(message.senderId)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 text-right text-gray-400">
                  {formatTimestamp(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
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