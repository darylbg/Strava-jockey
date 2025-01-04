const express = require("express");
const router = express.Router();
// const {getAllOrders, getAllAdmins} = require("../db/queries");

// Home Page
router.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// Details Page
router.get("/details", (req, res) => {
  res.send("Welcome to the Details Page!");
});

module.exports = router;
