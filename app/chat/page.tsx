"use client";
import ChatList from "@/layout/chat-list";
import React, { useState } from "react";

const MessengerPage: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const conversations = [
    {
      id: 1,
      avatarUrl: "/images/avatar1.jpg",
      name: "John Doe",
      lastMessage: "Hello! How are you?",
      time: "10:30 AM",
    },
    {
      id: 2,
      avatarUrl: "/images/avatar2.jpg",
      name: "Jane Smith",
      lastMessage: "I am good, thank you!",
      time: "10:31 AM",
    },
    {
      id: 3,
      avatarUrl: "/images/avatar3.jpg",
      name: "Michael Johnson",
      lastMessage: "Let’s meet at 2 PM.",
      time: "09:15 AM",
    },
  ];

  // Danh sách tin nhắn cho mỗi cuộc trò chuyện
  const messagesForChat = {
    1: [
      {
        id: 1,
        avatarUrl: "/images/avatar1.jpg",
        name: "John Doe",
        time: "10:30 AM",
        message: "Hello! How are you?",
        status: "Delivered",
      },
      {
        id: 2,
        avatarUrl: "/images/avatar1.jpg",
        name: "John Doe",
        time: "10:31 AM",
        message: "I am good!",
        status: "Delivered",
      },
    ],
    2: [
      {
        id: 1,
        avatarUrl: "/images/avatar2.jpg",
        name: "Jane Smith",
        time: "10:30 AM",
        message: "How is your project going?",
        status: "Seen",
      },
    ],
    3: [
      {
        id: 1,
        avatarUrl: "/images/avatar3.jpg",
        name: "Michael Johnson",
        time: "9:00 AM",
        message: "Don’t forget our meeting at 2 PM.",
        status: "Delivered",
      },
    ],
  };

  return (
    <div className="container flex h-screen">
      <ChatList
        conversations={conversations}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
      />

      {/* {selectedChatId !== null ? (
        <div className="w-2/3">
          <ChatPage
            messages={messagesForChat[selectedChatId]}
            currentUser="John Doe"
          />
        </div>
      ) : (
        <div className="w-2/3 flex justify-center items-center">
          <p>Select a conversation to start chatting</p>
        </div> */}
      {/* )} */}
    </div>
  );
};

export default MessengerPage;
