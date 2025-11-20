const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: {
    type: Array,
    required: true
  },
  total: {                    // matches your route which sends `total`
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  payment: {                  // matches your route which sends `payment`
    type: String,
    enum: ["Online", "Cash on Delivery"],
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);










