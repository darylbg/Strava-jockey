const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

router.get("/", async (req, res) => {
    try {
        return res.json({message: "summary routes"});
    } catch (error) {
        console.log(error);
    }
    
});

module.exports = router;