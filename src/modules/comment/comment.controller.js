const CommentService = require('./comment.service');
/** 
* @swagger
*tags:
*    name: comments
*    description: API to manage your comments.
*/

//create comment

/**
 * @swagger
 * /comments:
 *   post:
 *     tags: [comments]
 *     description: create new comment
 *     parameters:
 *          - in: body
 *            name: body
 *            description: hint.. parentCommentId field is optional
 *            schema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  content:
 *                      type: string
 *                  tweetId:
 *                      type: string
 *                  parentCommentId:
 *                      type: string
 *                      required: false
 *     responses:
 *       201:
 *         description: Created
 */
exports.create = async (req, res, next) => {
    try {
        CommentService.validateComment(req);
        let comment = await CommentService.createComment(req);
        return res.status(200).send(comment);
    } catch (e) {
        console.log(e);
        return next(e);
    }

};