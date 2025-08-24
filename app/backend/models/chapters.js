const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: String,
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  content: String,
  summaryAudioUrl: String,
  summaryText: String,
  keyConcepts: [String],
  isActive: Boolean,
  createdAt: Date
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;