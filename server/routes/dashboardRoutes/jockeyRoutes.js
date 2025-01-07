const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../../db/connection");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO jockeys (username, password, email)
      VALUES ($1, $2, $3) RETURNING id, username, email`,
      [username, hashedPassword, email]
    );

    const newJockey = result.rows[0];
    res
      .status(201)
      .json({ message: "Jockey created successfully", jockey: newJockey });
  } catch (error) {
    console.error("Error creating jockey:", error);
    res.status(500).json({ message: "Failed to create jockey", error: error });
  }
});

// Get all jockeys
router.get("/", async (req, res) => {
  // const { username } = req.params;

  try {
    const result = await db.query(
      `SELECT id, username, email, role FROM jockeys`
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "no jockeys found" });
    }

    res.status(200).json({ message: "jockeys", user: result.rows[0] });
  } catch (error) {
    console.error("Error fetching jockeys:", error);
    res.status(500).json({ message: "Failed to fetch jockeys", error });
  }
});

// Get jockey by username
router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const result = await db.query(
      `SELECT id, username, email, role FROM jockeys WHERE username = $1`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user found", user: result.rows[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user", error });
  }
});

module.exports = router;
