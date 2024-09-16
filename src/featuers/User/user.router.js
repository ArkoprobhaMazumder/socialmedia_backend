import jwtTokenVerification from "../../utils/jwt.verification.js";
import UserController from "./user.controller.js";

import express from "express";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/signup', (req, res, next) => {
    userController.registerUser(req, res, next);
});
userRouter.post('/login', (req, res, next) => {
    userController.loginUser(req, res, next);
});
userRouter.put('/reset', jwtTokenVerification, (req, res, next) => {
    userController.resetPassword(req, res, next);
});
// userRouter.get('/verify', (req, res, next) => {
//     userController.emailvarification(req, res, next);
// });
userRouter.get('/:id', (req, res, next) => {
    userController.getOneUser(req, res, next);
});


export default userRouter;