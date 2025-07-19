const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Schemas
const ledLogSchema = new mongoose.Schema({
  color: String,
  state: String,
  timestamp: { type: Date, default: Date.now }
});
const irLogSchema = new mongoose.Schema({
  state: String,
  timestamp: { type: Date, default: Date.now }
});

const LedLog = mongoose.model("LedLog", ledLogSchema);
const IrLog = mongoose.model("IrLog", irLogSchema);

// Routes
app.get("/", (req, res) => {
  res.send("ESP32 Logger API Running");
});

app.post("/led", async (req, res) => {
  const { color, state } = req.body;
  const log = new LedLog({ color, state });
  await log.save();
  res.json({ message: "LED log saved" });
});

app.post("/ir", async (req, res) => {
  const { state } = req.body;
  const log = new IrLog({ state });
  await log.save();
  res.json({ message: "IR log saved" });
});

app.get("/logs/led", async (req, res) => {
  const logs = await LedLog.find().sort({ timestamp: -1 }).limit(20);
  res.json(logs);
});

app.get("/logs/ir", async (req, res) => {
  const logs = await IrLog.find().sort({ timestamp: -1 }).limit(20);
  res.json(logs);
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
