import { query } from '../database/index.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const result = await query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Server error");
  }
};
