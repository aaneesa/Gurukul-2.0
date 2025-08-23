require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});