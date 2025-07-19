const express = require('express');
const router = express.Router();
const MotionLog = require('../models/MotionLog');

router.post('/api/motion', async (req, res) => {
  try {
    const motionLog = new MotionLog({ status: req.body.status });
    await motionLog.save();
    res.json({ message: 'Motion log saved' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
