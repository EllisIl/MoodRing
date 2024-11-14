"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

// Helper function to fetch data from the backend
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const sendMessage = async (chatId, userId, content) => {
  const response = await fetch(`/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatId, userId, content }),
  });
  const data = await response.json();
  return data;
};

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState(1);  // Assuming chatId is set to 1 initially
  const userId = 1; // Assuming userId is 1 for the current user

  // Fetch chat messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      const data = await fetchData(`/api/chats/${chatId}/messages`);
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
      const newMessageData = await sendMessage(chatId, userId, newMessage);
      setMessages([...messages, newMessageData]);
      setNewMessage(""); // Clear input field after sending the message
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
      case "User1":
        return "/images/user1.jpg";
      case "User2":
        return "/images/user2.jpg";
      case "User3":
        return "/images/user3.jpg";
      case "You":
        return "/images/you.jpg"; // Image for the current user
      default:
        return "/images/default.jpg"; // Default image
    }
  };

  return (
    <div className={styles.page}>
      {/* First Sidebar: Channels */}
      <aside className={styles.sidenavChannels}>
        <h2>Channels</h2>
        <div className={styles.channelList}>
          {chats.map((chat) => (
            <div key={chat.chatId} className={styles.channel}>
              <Image
                src="/images/dog1.jpg"
                alt={chat.chatName}
                width={40}
                height={40}
                className={styles.channelImage}
                onClick={() => setChatId(chat.chatId)} // Set chatId on channel click
              />
            </div>
          ))}
        </div>
      </aside>

      {/* Second Sidebar: Users */}
      <aside className={styles.sidenavUsers}>
        <h2>Users</h2>
        <div className={styles.channelList}>
          {users.map((user) => (
            <div key={user.userId} className={styles.channel}>
              <span className={styles.userName}>{user.username}</span><br />
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
            <div key={message.messageId} className={styles.message}>
              <div className={styles.userImage}>
                <Image
                  src={getUserImage(message.username)}
                  alt={message.username}
                  width={40}
                  height={40}
                  className={styles.channelImage}
                />
              </div>
              <div className={styles.messageInfo}>
                <span className={styles.userName}>{message.username}</span>
                <span className={styles.lastMessage}>{message.content}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.messageInput}>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSendMessage} className={styles.sendButton}>
            Send
          </button>
        </div>
      </main>
    </div>
  );
}
