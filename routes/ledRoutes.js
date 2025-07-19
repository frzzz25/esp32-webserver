// routes/ledRoutes.js
const express = require("express");
const router = express.Router();

let ledStates = {
  blue: false,
  white: false,
  green: false,
};

let irLogs = [];

router.get("/leds", (req, res) => {
  res.json(ledStates);
});

router.post("/leds/:color/:state", (req, res) => {
  const { color, state } = req.params;
  if (ledStates.hasOwnProperty(color)) {
    ledStates[color] = state === "on";
    res.json({ success: true, color, state: ledStates[color] });
  } else {
    res.status(400).json({ error: "Invalid LED color" });
  }
});

router.post("/ir", (req, res) => {
  const { value } = req.body;
  irLogs.push({ value, time: new Date() });
  res.json({ success: true, value });
});

router.get("/logs/ir", (req, res) => {
  res.json(irLogs);
});

module.exports = router;
