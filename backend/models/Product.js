const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "cant't be blank"],
    },
    description: {
      type: String,
      required: [true, "cant't be blank"],
    },
    price: {
      type: String,
      required: [true, "cant't be blank"],
    },
    category: {
      type: String,
      required: [true, "cant't be blank"],
    },
    pictures: {
      type: Array,
      required: true,
    },
  },
  { minimize: false }
);

//Export the model
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
