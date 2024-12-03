"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim()) {
      setMessage("Login successful!");
      setTimeout(() => {
        router.push(`/?username=${encodeURIComponent(username)}`);
      }, 1000);
    } else {
      setMessage("Please enter a valid username.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f4f8",
        margin: 0,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#0070f3", fontSize: "32px", marginBottom: "20px" }}>
          Login
        </h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              marginBottom: "15px",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#005bb5")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#0070f3")}
          >
            Log In
          </button>
        </form>
        {message && (
          <p
            style={{
              marginTop: "20px",
              color: message === "Login successful!" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
