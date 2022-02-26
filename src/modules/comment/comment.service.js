const validations = require('./comment.validation');
const InvalidInputError = require('../../../errors/InvalidInputError');
const ResourceNotFoundError = require('../../../errors/ResourceNotFoundError');
const Tweet = require('../tweet/tweet.schema');
const Comment = require('./comment.schema');


const findTweetByID = async (id) => {
  return await Tweet.findById(id);
}
const findParentComment = async (commentId, tweetId) => {

  const parentComment = await Comment.findOne({
    _id: commentId
  });
  if (tweetId == parentComment?.tweetId) {
    return parentComment;
  }

}
exports.getAllCommentsOfTweet = async (id) => {
  const docWithParent = await Comment.find({
    tweetId: id
  }).sort({
    createdAt: 'desc'
  });
  return docWithParent;
}

exports.createComment = async (req) => {
  let comment = req.body;
  if (!await findTweetByID(comment.tweetId)) {
    throw new ResourceNotFoundError()
  }
  if (comment.parentCommentId != null && comment.parentCommentId != undefined) {
    if (!await findParentComment(comment.parentCommentId, comment.tweetId)) {
      throw new ResourceNotFoundError()
    }
  }
  comment.date = Date();
  const commentAfterCreated = await Comment.create(req.body);
  return commentAfterCreated;
}
// validations
exports.validateComment = (req) => {
  const error = validations.body.validate(req.body);
  if (error.error) {
    throw new InvalidInputError(error.error.message, 'Joi')
  }
}