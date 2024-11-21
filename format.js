{
    "chat_id": 1,
    "user_id": 42,
    "content": "Hello! This is a test message."
  }
  
  const saveMessage = async (chatId, userId, content) => {
    try {
      const queryText = `
        INSERT INTO messages (chat_id, user_id, content, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *;
      `;
  
      const result = await query(queryText, [chatId, userId, content]);
      return result.rows[0]; // Return the inserted row
    } catch (error) {
      console.error("Error saving message:", error);
      throw error;
    }
  };
  
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  
    socket.on("send_message", async (messageData) => {
      try {
        // Save the message in the database
        const savedMessage = await saveMessage(
          messageData.chat_id,
          messageData.user_id,
          messageData.content
        );
  
        // Broadcast the new message to all clients in the chat
        io.to(`chat_${messageData.chat_id}`).emit("new_message", savedMessage);
      } catch (error) {
        console.error("Error handling message:", error);
      }
    });
  });
  
  {
    "id": 101,
    "chat_id": 1,
    "user_id": 42,
    "content": "Hello! This is a test message.",
    "created_at": "2024-11-19T10:45:00Z"
  }
  
  socket.on("new_message", (message) => {
    // Update the local state with the new message
    setMessages((prevMessages) => [...prevMessages, message]);
  });
  