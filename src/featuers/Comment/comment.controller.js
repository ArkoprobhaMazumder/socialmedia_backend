
import CommentRepository from "./comment.repository.js";

export default class CommentController {

    constructor() {
        this.commentRepository = new CommentRepository();
    }

    async addComment(req, res, next) {
        try {
            let userId = req.userId;
            let { comment, postId, time } = req.body;
            let result = await this.commentRepository.add(userId, { postId, comment, time });
            if (result) {
                return res.status(201).send("Comment added");
            } else {
                return res.status(400).send("Not added");
            }
        } catch (error) {
            next(error);
        }
    }

    async getPostComment(req, res, next) {
        try {
            let { commentId, postId } = req.query;
            let result = await this.commentRepository.get(commentId, postId);
            if (result) {
                return res.status(200).send({ success: true, data: result });
            } else {
                return res.status(400).send("Dont get post comment");
            }
        } catch (error) {
            next(error);
        }
    }

    async deletePostComment(req, res, next) {
        try {
            const { postId, commentId } = req.query;
            await this.commentRepository.delete(postId, commentId);
            res.status(201).send("Deleted successfully");
        } catch (error) {
            next(error);
        }
    }

    async updatePostComment(req, res, next) {
        try {
            let { commentId, comment } = req.body;
            let result = await this.commentRepository.update(commentId, comment);
            console.log(result);
            res.status(201).send("comment updated");
        } catch (error) {
            next(error);
        }
    }
}