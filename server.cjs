require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let db;
MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db('esp32');
    console.log('✅ Connected to MongoDB');
  })
  .catch(err => console.error('❌ MongoDB Error:', err));

app.post('/log/led', async (req, res) => {
  try {
    const { led, state } = req.body;
    await db.collection('led_logs').insertOne({
      led, state, timestamp: new Date()
    });
    res.status(200).send('LED log saved');
  } catch (error) {
    res.status(500).send('Error logging LED');
  }
});

app.post('/log/ir', async (req, res) => {
  try {
    const { state } = req.body;
    await db.collection('ir_logs').insertOne({
      state, timestamp: new Date()
    });
    res.status(200).send('IR log saved');
  } catch (error) {
    res.status(500).send('Error logging IR');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
