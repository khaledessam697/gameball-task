const express = require('express');
const TweetController = require('../modules/tweet/tweet.controller');

const router = express.Router();

router.post('/', TweetController.create);

router.get('/', TweetController.getTweets);


module.exports = router;