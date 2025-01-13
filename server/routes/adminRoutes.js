const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieJwtAuth = require("../middleware/cookieJwtAuth");

// routes/adminRoutes.js
router.get("/", cookieJwtAuth, (req, res) => {
  // Extract only necessary user data
  const { user } = req;
  const userData = {
    id: user.id,
    email: user.email,
    username: user.username
  };
  
  res.status(200).json({ user: userData });
});

// /admin for admin and jockey login *publicly accessible
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Credentials missing" }); // 400 for missing credentials
    }

    const result = await db.query(`SELECT * FROM jockeys WHERE email = $1`, [
      email,
    ]);

    if (!result.rows[0]) {
      // User not found
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password" }); // 401 for incorrect password
    }

    // Create JWT token, set to browser cookie
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === "production", // Ensure cookies are sent only over HTTPS in production
      sameSite: "lax", // Prevent cross-site request forgery (CSRF)
      path: "/",
      domain: "localhost",
    });

    // return res.redirect("/admin/dashboard/summary")
    return res.status(200).json({
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email }, // Send user data
    });
  } catch (error) {
    console.log("login error", error);
    res.status(500).json({ message: "Error logging in", error: error.message }); // Handle server error
  }
});

// Backend logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    domain: "localhost"
  });
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
