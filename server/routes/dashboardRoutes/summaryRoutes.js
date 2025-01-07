const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

router.get("/", async (req, res) => {
    res.json({message: "summary routes"})
});

module.exports = router;