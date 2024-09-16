import ApplicationError from "../../utils/errorHandler.js";
import UserModel from "../User/user.schema.js";
import likeModel from '../Like/like.schema.js';
import postModel from '../Post/post.schema.js'
import { ObjectId } from "mongodb";
import { verifyEmail } from "../../utils/emailVerification.js";
import mongoose from "mongoose";


export default class UserProfileRepository {


    async details(userId) {
        try {
            let user = await UserModel.findById(userId).populate('posts');
            return user;
        } catch (error) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async likedPosts(userId) {
        try {
            let likedPostIds = await likeModel.find({ userId: new ObjectId(userId), types: 'post' });
            let allPosts = await postModel.find();
            let posts = [];
            likedPostIds.forEach((ele) => {
                for (let post of allPosts) {
                    if (ele.likeable.toString() == post._id.toString()) {
                        posts.push(post);
                    }
                }
            })
            return posts;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async changeName(userId, name) {
        try {
            await UserModel.findByIdAndUpdate({ _id: userId }, { name: name });
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            }
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async changePassword(userId, password) {
        try {
            let user = await UserModel.findById(userId);
            user.password = password;
            await user.save();
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            }
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async otp(email) {
        try {
            let userMail = await UserModel.findOne({ email: email });
            if (!userMail) {
                return false;
            }
            let systemOtp = verifyEmail(email);
            return systemOtp;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async friendRequests(userId) {
        try {
            let user = await UserModel.findById(userId);
            return user.friendRequests;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async friends(userId) {
        try {
            let friends = await UserModel.findById(userId);
            return friends.friends;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}