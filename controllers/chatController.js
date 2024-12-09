import { query } from '../database/index.js';

// Get all chats
const getAllChats = async (req, res) => {
  try {
    const result = await query("SELECT * FROM chats");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).send("Server error");
  }
};

// Get messages for a specific chat
const getMessagesByChatId = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await query("SELECT * FROM messages WHERE chat_id = $1", [chatId]);
    res.status(200).json({ messages: result.rows });
  } catch (error) {
    console.error("Error fetching messages for chat:", error);
    res.status(500).send("Server error");
  }
};

export { getAllChats, getMessagesByChatId };