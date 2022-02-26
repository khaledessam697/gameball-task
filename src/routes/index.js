const tweetRoutes = require('./tweet.route');
const commentRoutes = require('./comment.route');

const express = require('express');
const app = express();

app.use(`/tweets`, tweetRoutes);
app.use(`/comments`, commentRoutes);

module.exports = app;