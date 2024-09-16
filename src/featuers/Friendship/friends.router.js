import express from "express";
import FriendController from "./friends.controller.js";

const friendRouter = express.Router();

const friendController = new FriendController();

friendRouter.post('/friendrequest', (req, res, next) => {
    friendController.sendReqest(req, res, next);
});
friendRouter.post('/acceptrequest', (req, res, next) => {
    friendController.acceptRequest(req, res, next);
});

export default friendRouter;

