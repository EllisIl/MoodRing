import { query } from "../database/index.js";

const addUser = async (req, res) => {
  const { username } = req.body;
  try {
    const exists = await query("SELECT * FROM `users` WHERE `username = $1`", [
      username,
    ]);
    if (exists.rows.length > 0) {
      res.status(200).json(exists.rows[0]);
    } else {
      const result = await query(
        "INSERT INTO users (username) VALUES ($1) RETURNING *",
        [username]
      );
      res.status(201).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).send("Server error");
  }
};
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Server error");
  }
};

export { getAllUsers, addUser };
