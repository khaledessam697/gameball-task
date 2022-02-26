const Joi = require('@hapi/joi');

const validations = {
    body: Joi.object({
        username: Joi.string().max(20).min(4).required(),
        content: Joi.string().max(140).min(1).required(),
    }, ).required()
}
module.exports = validations;