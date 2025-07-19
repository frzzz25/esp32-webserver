const express = require("express");
const router = express.Router();
const LEDLog = require("../models/LEDLog");

const ledPins = {
  blue: 18,
  white: 19,
  green: 21
};

router.post("/:color", async (req, res) => {
  const color = req.params.color;
  const pin = ledPins[color];

  if (!pin) {
    return res.status(400).json({ message: "Invalid LED color" });
  }

  const log = new LEDLog({
    color,
    state: "toggled",
    timestamp: new Date()
  });

  await log.save();

  // Simulate GPIO toggle (replace with real ESP32 endpoint if needed)
  console.log(`Simulating GPIO toggle on pin ${pin} for ${color} LED`);

  res.json({ message: `${color.toUpperCase()} LED toggled.` });
});

module.exports = router;
