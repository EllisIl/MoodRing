import { query } from '../database/index.js';

// Add a new message to a chat
export const addMessage = async (req, res) => {
  const { chatId, userId, content } = req.body;
  try {
    const result = await query(
      "INSERT INTO messages (chat_id, user_id, content, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [chatId, userId, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).send("Server error");
  }
};
