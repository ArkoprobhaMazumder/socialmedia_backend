

import express from "express";
import PostController from "./post.controller.js";

const postRouter = express.Router();

const postController = new PostController();


postRouter.post('/', (req, res, next) => {
    postController.addUserPost(req, res, next);
});
postRouter.get('/userposts', (req, res, next) => {
    postController.getUserPost(req, res, next);
});
postRouter.put('/updatepost', (req, res, next) => {
    postController.updatePost(req, res, next);
});
postRouter.delete('/deletepost', (req, res, next) => {
    postController.deletePost(req, res, next);
});


export default postRouter;