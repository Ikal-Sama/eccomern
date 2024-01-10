const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema(
  {
    products: {
      type: Object,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "proccessing",
    },
    total: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: new Date().toISOString().split("T")[0],
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { minimize: false }
);

//Export the model
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
