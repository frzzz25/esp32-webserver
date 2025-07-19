// models/motionLog.js
const mongoose = require('mongoose');

const motionLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['HIGH', 'LOW'], required: true }
});

module.exports = mongoose.model('MotionLog', motionLogSchema);
