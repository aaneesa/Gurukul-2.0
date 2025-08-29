const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  clerkUserId: {
    type: String,
    unique: true,
    sparse: true,
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  firstSignUp: {
    type: Date,
    default: Date.now,
  },
  
  lastVisit: {
    type: Date,
    default: Date.now,
  },
  streakCount: {
    type: Number,
    default: 0,
  },
  lastStreakDate: {
    type: Date,
  },
  
}, {
  timestamps: true,
});
userSchema.methods.shouldRedirect = function() {
  return !this.hasVisited;
};
userSchema.methods.markAsVisited = function() {
  this.hasVisited = true;
  this.lastVisit = new Date();
  return this.save();
};
userSchema.methods.resetVisitStatus = function() {
  this.hasVisited = false;
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
