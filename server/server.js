
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { exec } = require("child_process");

app.get("/dyno.png", (req, res) => {
  const { brand, model, year, motor } = req.query;
  console.log("Generating dyno chart for:", brand, model, year, motor);
  exec("python3 dyno.py", () => {
    res.sendFile(__dirname + "/data/dyno_chart_preview.png");
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
