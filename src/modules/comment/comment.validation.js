const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

const validations = {
    body: Joi.object({
        username: Joi.string().max(20).min(4).required(),
        content: Joi.string().max(140).min(1).required(),
        tweetId: Joi.objectId().required(),
        parentCommentId: Joi.objectId(),
    }, ).required()
}
module.exports = validations;