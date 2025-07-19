// server.cjs
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const ledRoutes = require("./routes/ledRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/leds", ledRoutes);

// Test route to verify server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`✅ ESP32 Server is Running on port ${PORT}`);
});
