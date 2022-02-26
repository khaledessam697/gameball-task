const express = require('express');
const CommentController = require('../modules/comment/comment.controller');

const router = express.Router();

router.post('/', CommentController.create);



module.exports = router;