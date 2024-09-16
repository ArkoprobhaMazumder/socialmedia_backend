
import UserProfileRepository from "./userProfile.repository.js";

let otp;

export default class UserProfileController {

    constructor() {
        this.userProfileRepo = new UserProfileRepository();
    }

    async userDetails(req, res, next) {
        try {
            const userId = req.userId;
            let result = await this.userProfileRepo.details(userId);
            if (result) {
                return res.status(200).send({ success: true, data: result });
            } else {
                return res.status(400).send("No Details Found");
            }
        } catch (error) {
            next(error);
        }
    }

    async userLikedPosts(req, res, next) {
        try {
            let userId = req.userId;
            let result = await this.userProfileRepo.likedPosts(userId);
            if (result) {
                return res.status(200).send({ success: true, data: result });
            } else {
                return res.status(400).send("No posts Found");
            }
        } catch (error) {
            next(error);
        }
    }

    async changeUserName(req, res, next) {
        try {
            let userId = req.userId;
            let { name } = req.body;
            if (!name || name.length == 0) {
                return res.status(400).send("Give a valid name");
            }
            await this.userProfileRepo.changeName(userId, name);
            return res.status(201).send("Name Changed");
        } catch (error) {
            next(error);
        }
    }

    async changeUserPassword(req, res, next) {
        try {
            let userId = req.userId;
            let password = req.body.password;

            await this.userProfileRepo.changePassword(userId, password);
            return res.status(201).send("Password Changed");
        } catch (error) {
            next(error);
        }
    }

    async sendOtp(req, res, next) {
        try {
            let { email } = req.body;
            let result = await this.userProfileRepo.otp(email);
            otp = result;
            if (result) {
                return res.status(200).send("Otp send to your mail");
            } else {
                return res.status(400).send("No Existing email");
            }
        } catch (error) {
            next(error);
        }
    }

    async verifyOtp(req, res, next) {
        try {
            let { userOtp } = req.body;
            if (otp == userOtp) {
                return res.status(200).send("Otp Verified");
            } else {
                return res.status(400).send("Invalid Otp");
            }
        } catch (error) {
            next(error);
        }
    }

    async showFriendRequests(req, res, next) {
        try {
            let userId = req.userId;
            let result = await this.userProfileRepo.friendRequests(userId);
            if (!result || result.length <= 0) {
                return res.status(400).send("No Friend Requests");
            } else {
                return res.status(200).send({ success: true, data: result });
            }
        } catch (error) {
            next(error);
        }
    }

    async showFriends(req, res, next) {
        try {
            let userId = req.userId;
            let result = await this.userProfileRepo.friends(userId);
            if (!result || result.length <= 0) {
                return res.status(400).send("No Friends ");
            } else {
                return res.status(200).send({ success: true, data: result });
            }
        } catch (error) {
            next(error);
        }
    }
}