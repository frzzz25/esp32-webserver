const express = require("express");
const router = express.Router();
const MotionLog = require("../models/motionLog");

router.post("/motion", async (req, res) => {
  try {
    const { value } = req.body;
    const newLog = new MotionLog({ value });
    await newLog.save();
    res.status(201).json({ message: "Motion log saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
