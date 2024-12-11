"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";

// Helper function to fetch data from the backend
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const sendMessage = async (chatId, userId, content, emotion) => {
  const response = await fetch(`/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatId, userId, content, emotion }),
  });
  const data = await response.json();
  return data;
};

const emotions = [
  { name: "Happy", color: "#FCE78A" }, // Softer yellow
  { name: "Sad", color: "#A5C9E0" },  // Darker pastel blue
  { name: "Angry", color: "#F4A6A6" }, // Richer pastel red
  { name: "Neutral", color: "#D4D4D4" }, // Neutral gray
];


export default function Home() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState(1); // Assuming chatId is set to 1 initially
  const [selectedEmotion, setSelectedEmotion] = useState("Neutral");
  const userId = 1; // Assuming userId is 1 for the current user
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "Guest";

  // Fetch chat messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      const data = await fetchData(`/api/chats/${chatId}`);
      setMessages(data.messages);
    };

    const fetchUsers = async () => {
      const data = await fetchData("/api/users");
      setUsers(data);
    };

    const fetchChats = async () => {
      const data = await fetchData("/api/chats");
      setChats(data);
    };

    fetchMessages();
    fetchUsers();
    fetchChats();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const newMessageData = await sendMessage(chatId, userId, newMessage, selectedEmotion);
      setMessages([...messages, newMessageData]);
      setNewMessage(""); // Clear input field after sending the message
    }
  };

  // Handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      handleSendMessage();
    }
  };

  const getLastMessage = (user) => {
    const userMessages = messages.filter((message) => message.user === user);
    return userMessages.length > 0
      ? userMessages[userMessages.length - 1].content
      : "";
  };

  const getUserImage = (user) => {
    switch (user) {
      default:
        return "/images/default.jpg"; // Default image
    }
  };

  return (
    <div className={styles.page}>
      {/* First Sidebar: Channels */}
      <aside className={styles.sidenavChannels}>
        <h2>Profile</h2>
        <div className={styles.channelList}>
          <div className={styles.channel}>
            <Image
              src="/images/dog1.jpg"
              alt="profile picture"
              width={40}
              height={40}
              className={styles.channelImage}
              onClick={() => {
                setChatId(chat.chatId);
              }}
            />
          </div>
        </div>
      </aside>

      {/* Second Sidebar: Users */}
      <aside className={styles.sidenavUsers}>
        <h2>Welcome, {username}!</h2>
        <div className={styles.channelList}>
          {users.map((user) => (
            <div key={user.userId} className={styles.channel}>
              <span className={styles.userName}>{user.username}</span>
              <br />
              <span className={styles.lastMessagePreview}>
                {getLastMessage(user.username)}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Area: Conversations */}
      <main className={styles.main}>
        <h2 className={styles.title}>Conversation</h2>
        <div className={styles.messageList}>
          {messages.map((message) => (
            <div
              key={message.messageId}
              className={styles.message}
              style={{
                backgroundColor: emotions.find((e) => e.name === message.emotion)?.color || "#fff",
              }}
            >
              <div className={styles.messageInfo}>
                <span className={styles.userName}>{message.username}</span>
                <span className={styles.lastMessage}>{message.content}</span>
              </div>
              <span className={styles.userName}>
                {new Date(message.created_at).toLocaleString("en-US", {
                  timeZone: "America/Phoenix",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.messageInput}>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className={styles.input}
            style={{
              backgroundColor: emotions.find((e) => e.name === selectedEmotion).color,
            }}
          />
          <button onClick={handleSendMessage} className={styles.sendButton}>
            Send
          </button>
        </div>
      </main>

      {/* Emotion Selector */}
      <div className={styles.emotionSelector}>
        {emotions.map((emotion) => (
          <button
            key={emotion.name}
            onClick={() => setSelectedEmotion(emotion.name)}
            style={{
              backgroundColor: emotion.color,
              color: "#333",
              border: selectedEmotion === emotion.name ? "2px solid #555" : "1px solid #ccc",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            className={styles.emotionButton}
          >
            {emotion.name}
          </button>
        ))}
      </div>
    </div>
  );
}
