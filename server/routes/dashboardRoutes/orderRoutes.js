const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// Get all orders
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM orders`
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ message: "orders", orders: result });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

module.exports = router;