const validations = require('./tweet.validation');
const InvalidInputError = require('../../../errors/InvalidInputError');
const ResourceNotFoundError = require('../../../errors/ResourceNotFoundError');
const Tweet = require('./tweet.schema');
const CommentService = require('../comment/comment.service')

class TweetService {

  async getAllTweets(req) {
    let tweetsWithComments = [],
      comments;
    let tweets = await Tweet.find({}).sort({
      createdAt: 'desc'
    }).select('-__v');
    for (const element of tweets) {
      comments = await CommentService.getAllCommentsOfTweet(element._id);
      tweetsWithComments.push({
        tweet: element,
        comments
      })
    }
    return tweetsWithComments;
  }

  async createTweet(req) {
    let tweet = req.body;
    tweet.date = Date();
    const tweetAfterCreated = await Tweet.create(req.body);
    return tweetAfterCreated;
  }
  // validations
  validateTweet(req) {
    const error = validations.body.validate(req.body);
    if (error.error) {
      throw new InvalidInputError(error.error.message, 'Joi')
    }
  }
}


module.exports = new TweetService();