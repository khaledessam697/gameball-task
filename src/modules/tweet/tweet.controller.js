const TweetService = require('./tweet.service');
/** 
* @swagger
*tags:
*    name: tweets
*    description: API to manage your tweets.
*/

//create tweet
/**
 * @swagger
 * /tweets:
 *   post:
 *     tags: [tweets]
 *     description: create new tweet
 *     parameters:
 *          - in: body
 *            name: body
 *            description: ...
 *            schema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  content:
 *                      type: string
 *     responses:
 *       201:
 *         description: Created
 */
exports.create = async (req, res, next) => {
    try {
        await TweetService.validateTweet(req);
        let tweet = await TweetService.createTweet(req);
        return res.status(200).send(tweet);
    } catch (e) {
        console.log(e);
        return next(e);
    }
};

//Get all tweets
/**
 * @swagger
 * /tweets:
 *  get:
 *    tags: [tweets]
 *    description: Use to get all tweets
 *    responses:
 *      '200':
 *        description: A successful response
 */
exports.getTweets = async (req, res, next) => {
    try {
        const tweets = await TweetService.getAllTweets(req);
        return res.status(200).send({
            tweets
        });
    } catch (e) {
        console.log(e);
        return next(e);
    }
};