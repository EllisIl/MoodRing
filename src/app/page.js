"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
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
            <div key={message.id} className={styles.message}>
              <div className={styles.userImage}>
                <Image
                  src={getUserImage(message.user)}
                  alt={message.user}
                  width={40}
                  height={40}
                  className={styles.channelImage}
                />
              </div>
              <div className={styles.messageInfo}>
                <span className={styles.userName}>{message.user}</span>
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
