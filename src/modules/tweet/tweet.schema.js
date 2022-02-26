const mongoose = require('mongoose');
const {
  ObjectId
} = mongoose.Schema;

const TweetSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  date: {
    type: Date
  }
}, {
  timestamps: true
});
const Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;