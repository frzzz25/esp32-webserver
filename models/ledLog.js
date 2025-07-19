const mongoose = require("mongoose");

const ledLogSchema = new mongoose.Schema({
  color: String,
  state: String,
  timestamp: Date
});

module.exports = mongoose.model("LEDLog", ledLogSchema);
