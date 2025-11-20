const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Place order
router.post("/", async (req, res) => {
  try {
    // Expecting these exact keys from frontend
    const { userId, items, total, address, payment } = req.body;

    console.log("Incoming Order:", req.body);

    // Basic validation
    if (!userId || !items?.length || total == null || !address || !payment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = new Order({ userId, items, total, address, payment });
    await order.save();

    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order Save Error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get orders for a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    console.error("Fetch Orders Error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
