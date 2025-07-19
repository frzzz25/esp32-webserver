// models/ledLog.js

const mongoose = require('mongoose');

const ledLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  color: {
    type: String, // "blue", "white", or "green"
    required: true
  },
  state: {
    type: String, // "ON" or "OFF"
    required: true
  }
});

module.exports = mongoose.model('LedLog', ledLogSchema);
