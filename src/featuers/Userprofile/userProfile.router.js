import express from "express";
import UserProfileController from "./userprofile.controller.js";



const userProfileRouter = express.Router();

const userProfileController = new UserProfileController();


userProfileRouter.get('/details', (req, res, next) => {
    userProfileController.userDetails(req, res, next);
});
userProfileRouter.get('/likedposts', (req, res, next) => {
    userProfileController.userLikedPosts(req, res, next);
});
userProfileRouter.put('/changename', (req, res, next) => {
    userProfileController.changeUserName(req, res, next);
});
userProfileRouter.get('/sendotp', (req, res, next) => {
    userProfileController.sendOtp(req, res, next);
});
userProfileRouter.get('/verifyotp', (req, res, next) => {
    userProfileController.verifyOtp(req, res, next);
});
userProfileRouter.put('/changepassword', (req, res, next) => {
    userProfileController.changeUserPassword(req, res, next);
});
userProfileRouter.get('/friendrequests', (req, res, next) => {
    userProfileController.showFriendRequests(req, res, next);
});
userProfileRouter.get('/friends', (req, res, next) => {
    userProfileController.showFriends(req, res, next);
});

export default userProfileRouter;

