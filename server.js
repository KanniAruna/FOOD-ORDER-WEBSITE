
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// -------------------- CONNECT TO MONGODB --------------------
mongoose.connect("mongodb://127.0.0.1:27017/foodie-express")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// -------------------- ROUTE IMPORTS --------------------
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orderRoutes");   // <--- YOUR FILE NAME

// Use routes
app.use("/auth", authRoutes);
app.use("/order", orderRoutes);

// -------------------- IMPORT ORDER MODEL --------------------
const Order = require("./models/Order");

// -------------------- ADMIN — GET ALL ORDERS --------------------
app.get("/admin/orders", async (req, res) => {
  try {
    const orders = await Order.find();   // Fetch ALL orders from DB
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- DEFAULT ROUTE --------------------
app.get("/", (req, res) => {
  res.send("Backend running for Food Order Project!");
});

// -------------------- START SERVER --------------------
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));





