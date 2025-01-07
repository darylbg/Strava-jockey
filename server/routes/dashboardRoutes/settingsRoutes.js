const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

router.get("/", async (req, res) => {
    res.json({message: "settings routes"})
});

module.exports = router;