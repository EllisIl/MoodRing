import { query } from '../database/index.js';

// Add a new message to a chat
const addMessage = async (req, res) => {
  const { chatId, userId, content, emotion } = req.body;
  try {
    const result = await query(
      "INSERT INTO messages (chat_id, user_id, content, created_at, emotion) VALUES ($1, $2, $3, NOW(), $4) RETURNING *",
      [chatId, userId, content, emotion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).send("Server error");
  }
};

export { addMessage }