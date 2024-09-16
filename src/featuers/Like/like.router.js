import express from 'express';
import LikeController from './like.controller.js';


const likeRouter = express.Router();

const likeController = new LikeController();

likeRouter.post('/', (req, res, next) => {
    likeController.addLike(req, res, next);
})

export default likeRouter;