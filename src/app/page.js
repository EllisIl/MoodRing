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
  const [chatId, setChatId] = useState(null); // Start with no chat selected
  const userId = 1; // Assuming userId is 1 for the current user

  // Fetch chats and users on component mount
  useEffect(() => {
    const fetchChatsAndUsers = async () => {
      const [chatsData, usersData] = await Promise.all([
        fetchData("/api/chats"),
        fetchData("/api/users"),
      ]);
      setChats(chatsData);
      setUsers(usersData);
    };

    fetchChatsAndUsers();
  }, []);

  // Fetch messages when `chatId` changes
  useEffect(() => {
    if (chatId) {
      const fetchMessages = async () => {
        const data = await fetchData(`/api/chats/${chatId}`);
        setMessages(data.messages);
      };

      fetchMessages();
    }
  }, [chatId]);

  const handleChannelClick = (id) => {
    setChatId(id); // Update chatId
    setMessages([]); // Clear previous messages to prevent stale data
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const newMessageData = await sendMessage(chatId, userId, newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessageData]);
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
        return "/images/dog1.jpg";
      case "User2":
        return "/images/dog2.jpg";
      case "User3":
        return "/images/dog3.jpg";
      case "You":
        return "/images/you.jpg"; // Image for the current user
      default:
        return "/images/default.jpg"; // Default image
    }
  };

  // Estado para los mensajes
  const [messages, setMessages] = useState([
    { id: 1, user: "User1", content: "Hello! How are you?" },
    { id: 2, user: "User2", content: "Let’s start the meeting at 3 PM." },
    { id: 3, user: "User1", content: "I’m doing great, thank you!" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, user: "You", content: newMessage },
      ]);
      setNewMessage("");
    }
  };

  // Obtenemos el último mensaje de cada usuario
  const getLastMessage = (user) => {
    const userMessages = messages.filter((message) => message.user === user);
    return userMessages.length > 0
      ? userMessages[userMessages.length - 1].content
      : "";
  };

  // Obtenemos la imagen de cada usuario
  const getUserImage = (user) => {
    switch (user) {
      case "User1":
        return "/images/user1.jpg";
      case "User2":
        return "/images/user2.jpg";
      case "User3":
        return "/images/user3.jpg";
      case "You":
        return "/images/you.jpg"; // Imagen para el usuario "You"
      default:
        return "/images/default.jpg"; // Imagen por defecto
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
                onClick={() => handleChannelClick(chat.chatId)} // Update chatId on channel click
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
      {/* Primer Sidenav: Canales */}
      <aside className={styles.sidenavChannels}>
        <h2>Channels</h2>
        <div className={styles.channelList}>
          <div className={styles.channel}>
            <Image
              src="/images/dog1.jpg"
              alt="Channel 1"
              width={40}
              height={40}
              className={styles.channelImage}
            />
          </div>
          <div className={styles.channel}>
            <Image
              src="/images/dog2.jpg"
              alt="Channel 2"
              width={40}
              height={40}
              className={styles.channelImage}
            />
          </div>
          <div className={styles.channel}>
            <Image
              src="/images/dog3.jpg"
              alt="Channel 3"
              width={40}
              height={40}
              className={styles.channelImage}
            />
          </div>
        </div>
      </aside>

      {/* Segundo Sidenav: Usuarios */}
      <aside className={styles.sidenavUsers}>
        <h2>Users</h2>
        <div className={styles.channelList}>
          {["User1", "User2", "User3"].map((user) => (
            <div key={user} className={styles.channel}>
              <span className={styles.userName}>{user}</span><br />
              <span className={styles.lastMessagePreview}>
                {getLastMessage(user)}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* Área Principal: Conversaciones */}
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

