const express = require("express");
const router = express.Router();
const { getAllAdmins } = require("../db/queries");
const { createJockey } = require("../db/mutations");

// routes
// /login
// /dashboard
// /logout
// /users

router.post("/dashboard/register", async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  
  try {
    const newJockey = await createJockey({email, password});

    res.status(200).json({
        message: "Successfully registered new jockey",
        data: newJockey
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating jockey.",
      error: error.message
    });
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const admins = await getAllAdmins();

    res.json({
      message: "welcome to dashboard",
      data: admins,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while fetching admins.",
      error: error.message,
    });
  }
});

module.exports = router;
