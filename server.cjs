const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// SETUP
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

// MONGODB CONNECTION
mongoose.connect('mongodb+srv://frzzz25:00000000@cluster0.jjvexwe.mongodb.net/esp32_logs?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// SCHEMA
const logSchema = new mongoose.Schema({
    type: String,
    value: String,
    timestamp: { type: Date, default: Date.now }
});

const Log = mongoose.model('Log', logSchema);

// ROUTES

// TEST
app.get('/', (req, res) => {
    res.send('ESP32 Webserver Backend is Running');
});

// RECEIVE IR SENSOR DATA
app.post('/api/ir', async (req, res) => {
    const { irState } = req.body;
    try {
        const log = new Log({ type: 'IR', value: irState });
        await log.save();
        console.log('✅ IR data saved:', irState);
        res.status(201).json({ message: 'IR data saved' });
    } catch (error) {
        console.error('❌ Failed to save IR data:', error);
        res.status(500).json({ error: 'Failed to save IR data' });
    }
});

// RECEIVE LED CONTROL
app.post('/api/led', async (req, res) => {
    const { color, state } = req.body;
    try {
        const log = new Log({ type: `LED-${color}`, value: state });
        await log.save();
        console.log(`✅ LED ${color} is now ${state}`);
        res.status(201).json({ message: 'LED state saved' });
    } catch (error) {
        console.error('❌ Failed to save LED state:', error);
        res.status(500).json({ error: 'Failed to save LED state' });
    }
});

// GET ALL LOGS
app.get('/api/logs', async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
        res.json(logs);
    } catch (error) {
        console.error('❌ Failed to fetch logs:', error);
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});

// START SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
