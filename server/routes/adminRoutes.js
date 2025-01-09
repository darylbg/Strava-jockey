const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const bcrypt = require("bcrypt");

// /admin for admin and jockey login *publicly accessible
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Credentials missing" }); // 400 for missing credentials
    }

    const result = await db.query(
      `SELECT * FROM jockeys WHERE email = $1`, [email]
    );

    if (!result.rows[0]) { // User not found
      return res.status(404).json({ message: "User not found" });
    }
    
    const user = result.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      return res.status(200).json({
        message: "Login successful",
        user: { id: user.id, username: user.username, email: user.email } // Send user data
      });
    } else {
      return res.status(401).json({ message: "Incorrect password" }); // 401 for incorrect password
    }

  } catch (error) {
    console.log("login error", error);
    res.status(500).json({ message: "Error logging in", error: error.message }); // Handle server error
  }
});


module.exports = router;
