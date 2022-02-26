const mongoose = require('mongoose');
const {
  ObjectId
} = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
  tweetId: {
    type: ObjectId,
    ref: 'Tweet',
    required: true,
  },

  parentCommentId: {
    type: ObjectId,
    ref: 'Comment',
    required: false, // if not populated, then its a top level comment
  },

  username: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  }
});
CommentSchema.virtual('children', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentCommentId',
  sort: {
    createdAt: 1
  }
}); /* toJSON option is set because virtual fields are not included in toJSON output by default. So, if you don't set this option, and call User.find().populate('refereals'), you won't get anything in refereals */
function autoPopulateSubs(next) {
  this.populate('parentCommentId');
  next();
}

CommentSchema
  .pre('findOne', autoPopulateSubs)
  .pre('find', autoPopulateSubs);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;