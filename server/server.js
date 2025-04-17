const express = require('express');
const cors = require('cors');
const data = require('./data/data.json');
const dynoData = require('./data/dyno-data.json');

const app = express();
app.use(cors());

app.get('/api/data', (req, res) => {
  res.json(data);
});

app.get('/api/dyno-data', (req, res) => {
  // TODO: filter based on query params if needed
  res.json(dynoData);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
