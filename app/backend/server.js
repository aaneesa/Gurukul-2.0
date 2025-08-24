// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json()); 
app.use(cors()); 

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MONGO_URI environment variable is not set.");
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const apiRoutes = require('./routes/index');
app.use('/api', apiRoutes);
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Gurukul 2.0 Backend is running!',
    timestamp: new Date().toISOString()
  });
});