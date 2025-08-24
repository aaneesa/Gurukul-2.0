const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  stateBoard: String,
  language: String,
  subject: String,
  grade: String,
  description: String,
  isActive: Boolean,
  createdAt: Date
});

module.exports = mongoose.model('Book', bookSchema);