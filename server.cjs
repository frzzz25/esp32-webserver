const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Schema for logs
const logSchema = new mongoose.Schema({
    type: String,
    value: String,
    timestamp: { type: Date, default: Date.now }
});
const Log = mongoose.model('Log', logSchema);

// ✅ Handle POST from ESP32
app.post('/api/log', async (req, res) => {
    const { type, value } = req.body;
    const newLog = new Log({ type, value });
    await newLog.save();
    res.sendStatus(200);
});

// ✅ Handle GET requests to check logs
app.get('/api/logs', async (req, res) => {
    const logs = await Log.find().sort({ timestamp: -1 }).limit(10);
    res.json(logs);
});

// ✅ Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log(`✅ ESP32 Server is Running on port ${port}`);
});
