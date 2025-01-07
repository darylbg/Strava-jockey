const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// /detail for submission form *publicly accessible
// /detail/:access_token for user editing of order *publicly accessible

// Create an order
router.post("/details", async (req, res) => {
  const {
    customer_email,
    customer_name,
    amount,
    distance,
    pace,
    start_anywhere,
    start_postcode,
    customer_notes,
  } = req.body;

  // Validate required fields
  if (
    !customer_email ||
    !customer_name ||
    !amount ||
    !distance ||
    !pace ||
    start_anywhere === undefined // Explicitly check for undefined
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Insert new order into the database
    const result = await db.query(
      `INSERT INTO orders (
        customer_email,
        customer_name,
        amount,
        distance,
        pace,
        start_anywhere,
        start_postcode,
        customer_notes
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING id, customer_name, customer_email, access_token, amount, distance, pace, start_anywhere, start_postcode, customer_notes`,
      [
        customer_email,
        customer_name,
        amount,
        distance,
        pace,
        start_anywhere,
        start_postcode,
        customer_notes,
      ]
    );

    // Extract the newly created order
    const newOrder = result.rows[0];

    // Respond with success
    res.status(201).json({
      message: "Successfully created new order",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating new order:", error);
    res.status(500).json({
      message: "Failed to create new order",
      error: error.message,
    });
  }
});

// Get order by access_token
router.get("/details/:access_token", async (req, res) => {
  const { access_token } = req.params;
  console.log("access token:", access_token);
  try {
    const result = await db.query(
      `SELECT * FROM orders WHERE access_token = $1`,
      [access_token]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No order found with that access token" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Failed to fetch order", error });
  }
});


// Update an order by access token
router.put("/details/:access_token", async (req, res) => {
  const { access_token } = req.params;
  const {
    amount,
    distance,
    pace,
    start_anywhere,
    start_postcode,
    customer_notes,
    order_status,
    payment_status,
    jockey_id,
    jockey_notes,
    gpx_file,
  } = req.body;

  // Validate required fields
  if (
    !amount ||
    !distance ||
    !pace
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const result = await db.query(
      `UPDATE orders 
       SET 
         amount = $1,
         distance = $2,
         pace = $3,
         start_anywhere = $4,
         start_postcode = $5,
         customer_notes = $6,
         order_status = $7,
         payment_status = $8,
         jockey_id = $9,
         jockey_notes = $10,
         gpx_file = $11,
         updated_at = CURRENT_TIMESTAMP
       WHERE access_token = $12
       RETURNING *`,
      [
        amount,
        distance,
        pace,
        start_anywhere,
        start_postcode,
        customer_notes,
        order_status,
        payment_status,
        jockey_id,
        jockey_notes,
        gpx_file,
        access_token,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({order: result.rows[0]})
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
});

module.exports = router;
