const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  language: String,
  description: String
});

module.exports = mongoose.model('Book', bookSchema);