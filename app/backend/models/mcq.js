const mongoose = require('mongoose');

const mcqSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  explanation: String,
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  topic: String,
  language: String,
  isGeneratedByAI: Boolean,
  aiModel: String,
  createdAt: Date
});

module.exports = mongoose.model('MCQ', mcqSchema);