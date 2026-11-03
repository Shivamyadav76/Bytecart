const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    rating: {
      rate: { type: Number, default: 4.5 },
      count: { type: Number, default: 10 }
    },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);