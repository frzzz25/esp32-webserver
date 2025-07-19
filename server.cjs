const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://frzzz25:00000000@cluster0.d3g0nmn.mongodb.net/esp32logs?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Schema
const logSchema = new mongoose.Schema({
  type: String,
  value: String,
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model('Log', logSchema);

// IR logging endpoint
app.post('/log-ir', async (req, res) => {
  const { irState } = req.body;

  const log = new Log({
    type: 'IR',
    value: irState,
    timestamp: new Date(),
  });

  await log.save();
  res.send({ message: 'IR data logged' });
});

// LED logging endpoint
app.post('/log-led', async (req, res) => {
  const { color, state } = req.body;

  const log = new Log({
    type: 'LED',
    value: `${color.toUpperCase()} turned ${state.toUpperCase()}`,
    timestamp: new Date(),
  });

  await log.save();
  res.send({ message: 'LED data logged' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
