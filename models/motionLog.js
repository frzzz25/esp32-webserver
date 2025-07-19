const mongoose = require('mongoose');

const motionLogSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('MotionLog', motionLogSchema);
