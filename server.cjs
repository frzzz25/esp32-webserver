const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let ledStates = {
  blue: "off",
  white: "off",
  green: "off",
};

// Serve a simple HTML UI
app.get("/", (req, res) => {
  res.send(`
    <h2>ESP32 LED Controller</h2>
    <button onclick="fetch('/led/blue/on')">Blue ON</button>
    <button onclick="fetch('/led/blue/off')">Blue OFF</button><br><br>
    <button onclick="fetch('/led/white/on')">White ON</button>
    <button onclick="fetch('/led/white/off')">White OFF</button><br><br>
    <button onclick="fetch('/led/green/on')">Green ON</button>
    <button onclick="fetch('/led/green/off')">Green OFF</button>
    <script>
      function fetch(url) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
      }
    </script>
  `);
});

// Endpoint to update LED state
app.get("/led/:color/:state", (req, res) => {
  const { color, state } = req.params;
  if (["blue", "white", "green"].includes(color) && ["on", "off"].includes(state)) {
    ledStates[color] = state;
    console.log(`${color} LED set to ${state}`);
    return res.send(`Set ${color} LED to ${state}`);
  } else {
    return res.status(400).send("Invalid color or state.");
  }
});

// Endpoint that ESP32 will call to get current state
app.get("/commands", (req, res) => {
  res.json(ledStates);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
