// server.cjs
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your real MongoDB Atlas connection string
const mongoURI = "mongodb+srv://frzzz25:00000000@cluster0.um5zb8e.mongodb.net/esp32?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Create schema and model
const logSchema = new mongoose.Schema({
  type: String,     // IR or LED
  value: String,    // HIGH, LOW, ON, OFF
  timestamp: Date
});
const Log = mongoose.model('Log', logSchema);

// Route to handle IR logging
app.post('/log-ir', async (req, res) => {
  const { irState } = req.body;
  const log = new Log({
    type: 'IR',
    value: irState,
    timestamp: new Date()
  });
  await log.save();
  res.send({ message: 'IR data logged' });
});

// Route to handle LED logging (for future use)
app.post('/log-led', async (req, res) => {
  const { ledColor, ledState } = req.body;
  const log = new Log({
    type: `LED-${ledColor}`,
    value: ledState,
    timestamp: new Date()
  });
  await log.save();
  res.send({ message: 'LED data logged' });
});

// Test route
app.get('/', (req, res) => {
  res.send('ESP32 Web Server is running!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
