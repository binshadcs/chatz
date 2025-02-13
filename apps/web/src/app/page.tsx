"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";


const publicGroup = {
  id: 0,
  name: "Public Chat Group",
  lastMessage: "Welcome to the public chat!",
  timestamp: "Just now",
  unreadCount: 5,
};

export default function Chats() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChats, setFilteredChats] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchQuery) {
        setFilteredChats([]);
        return;
      }

      try {
        const res = await fetch(`/api/users/search?name=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();

        setFilteredChats(
          data.map((user: any) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            lastMessage: "Say hello!",
            timestamp: "Just now",
            unreadCount: 0,
          }))
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const delayDebounce = setTimeout(fetchUsers, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-48px)] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Chats</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-semibold">{session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="p-6 border-b">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div
            onClick={() => router.push("/chats/public")}
            className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition duration-200 cursor-pointer"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">#</span>
              </div>
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">{publicGroup.name}</h3>
                <span className="text-sm text-gray-500">{publicGroup.timestamp}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-600">{publicGroup.lastMessage}</p>
                {publicGroup.unreadCount > 0 && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    {publicGroup.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t my-4"></div>
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition duration-200 cursor-pointer"
              onClick={() => router.push(`/chats/private/${chat.id}?name=${encodeURIComponent(chat.name)}`)}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{chat.name[0]}</span>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                  <span className="text-sm text-gray-500">{chat.timestamp}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-600">{chat.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
