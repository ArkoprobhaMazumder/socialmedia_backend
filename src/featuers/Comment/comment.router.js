
import express from "express";
import CommentController from "./comment.controller.js";

const commentRouter = express.Router();

const commentController = new CommentController();

commentRouter.post('/', (req, res, next) => {
    commentController.addComment(req, res, next);
});
commentRouter.get('/', (req, res, next) => {
    commentController.getPostComment(req, res, next)
});
commentRouter.delete('/', (req, res, next) => {
    commentController.deletePostComment(req, res, next)
});
commentRouter.put('/', (req, res, next) => {
    commentController.updatePostComment(req, res, next)
});



export default commentRouter;