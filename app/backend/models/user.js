const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  completed: Boolean,
  progress: Number,
  mcqScore: Number,
  timeSpent: Number,
  lastAccessed: Date,
  strengths: [String],
  weaknesses: [String]
});

const userSchema = new mongoose.Schema({
  clerkId: String,
  username: String,
  email: String,
  streaks: Number,
  maxStreak: Number,
  lastLogin: Date,
  totalStudyTime: Number,
  rewards: [String],
  points: Number,
  level: Number,
  currentBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  currentChapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  chapterProgress: [userProgressSchema],
  aiConversations: [{
    question: String,
    answer: String,
    timestamp: Date,
    topic: String
  }],
  preferredLanguage: String,
  difficultyPreference: String,
  totalChaptersCompleted: Number,
  totalMCQsAttempted: Number,
  totalMCQsCorrect: Number,
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model('User', userSchema);