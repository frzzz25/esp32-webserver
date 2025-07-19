const express = require("express");
const router = express.Router();
const LedLog = require("../models/ledLog");

router.post("/led", async (req, res) => {
  try {
    const { color, state } = req.body;
    const newLog = new LedLog({ color, state });
    await newLog.save();
    res.status(201).json({ message: "LED log saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
