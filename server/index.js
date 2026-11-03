const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("ByteCart MERN Backend is Live & Connected to MongoDB!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✓ MongoDB Cloud Atlas Connected Successfully!");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ ByteCart Server running on http://localhost:${PORT}`);
});