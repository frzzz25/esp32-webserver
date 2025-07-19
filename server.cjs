const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb+srv://frzzz25:00000000@cluster0.aaakpkj.mongodb.net/esp32_logs?retryWrites=true&w=majority')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// MongoDB Schemas
const MotionSchema = new mongoose.Schema({
  state: String,
  timestamp: { type: Date, default: Date.now }
});
const LEDSchema = new mongoose.Schema({
  color: String,
  state: String,
  timestamp: { type: Date, default: Date.now }
});

const Motion = mongoose.model('motion_logs', MotionSchema);
const LED = mongoose.model('led_logs', LEDSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/motion', async (req, res) => {
  try {
    const motion = new Motion(req.body);
    await motion.save();
    res.status(200).json({ message: 'Motion log saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save motion log' });
  }
});

app.post('/led', async (req, res) => {
  try {
    const led = new LED(req.body);
    await led.save();
    res.status(200).json({ message: 'LED log saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save LED log' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
