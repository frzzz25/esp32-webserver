const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const motionRoutes = require("./routes/motionRoutes");
const ledRoutes = require("./routes/ledRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Root route (optional, useful for testing)
app.get("/", (req, res) => {
  res.send("✅ ESP32 Server is Running");
});

// API Routes
app.use("/api", motionRoutes);
app.use("/api", ledRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// Start the server
app.listen(PORT, () => {
  console.log("✅ ESP32 Server is Running");
});
