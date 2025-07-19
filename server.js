const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB models
const MotionLog = require('./models/motionLog');
const LedLog = require('./models/ledLog');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (keep only this one)
mongoose.connect('mongodb+srv://frzzz25:00000000@cluster0.wku9p4h.mongodb.net/esp32_logs?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Root route for testing
app.get('/', (req, res) => {
  res.send('✅ ESP32 Server is Running');
});

// ✅ Route to log motion sensor data
app.post('/api/motion', async (req, res) => {
  try {
    const { status } = req.body;
    const newLog = new MotionLog({ status });
    await newLog.save();
    res.json({ message: 'Motion log saved ✅', log: newLog });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save motion log ❌' });
  }
});

// ✅ Route to log LED control events
app.post('/api/led', async (req, res) => {
  try {
    const { color, state } = req.body;
    const newLog = new LedLog({ color, state });
    await newLog.save();
    res.json({ message: 'LED log saved ✅', log: newLog });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save LED log ❌' });
  }
});

// ✅ Start server (only one app.listen!)
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
