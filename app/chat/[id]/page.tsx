"use client";
import ChatBubble from "@/components/chat/chat-bubble";
import React, { useState } from "react";

interface Message {
  id: number;
  avatarUrl: string;
  name: string;
  time: string;
  message: string;
  status: string;
}

const ChatPage: React.FC = () => {
  const currentUser = "Jane Smith";
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      avatarUrl: "/Sunflower_05.svg",
      name: "Admin",
      time: "10:30 AM",
      message: "Hello! How are you?",
      status: "Delivered",
    },
    {
      id: 2,
      avatarUrl: "/Sunflower_05.svg",
      name: "Admin",
      time: "10:30 AM",
      message: "How can I help you?",
      status: "Delivered",
    },
    {
      id: 3,
      avatarUrl: "/Lotus_05.svg",
      name: "Jane Smith",
      time: "10:31 AM",
      message: "I am good, thank you! How about you?",
      status: "Seen",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: messages.length + 1,
      avatarUrl: "/Lotus_05.svg",
      name: currentUser,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      message: newMessage,
      status: "Delivered",
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="container flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <div className="text-xl font-semibold">Tư vấn trực tiếp</div>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-4">
            <ChatBubble
              avatarUrl={msg.avatarUrl || "/img_no_img.jpg"}
              name={msg.name}
              time={msg.time}
              message={msg.message}
              status={msg.status}
              isCurrentUser={msg.name === currentUser}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 border-t border-gray-300">
        <input
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
          onClick={handleSendMessage}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
