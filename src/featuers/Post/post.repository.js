import postModel from "./post.schema.js";
import UserModel from "../User/user.schema.js"
import ApplicationError from "../../utils/errorHandler.js";
import { ObjectId } from "mongodb";

export default class PostRepository {


    async addPost(userId, postData) {
        try {
            let { message, image, time } = postData;
            let post = new postModel({ userId: new ObjectId(userId), message: message, image: image, postTime: time });
            let newPost = await post.save();
            await UserModel.updateOne({ _id: userId },
                {
                    '$push': {
                        posts: { postId: new ObjectId(newPost._id), postTime: time }
                    }
                }
            )
            return newPost;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async userPost(userId) {
        try {
            return await UserModel.findById(userId).populate('posts');

        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async update(userId, postId, updatedData) {
        try {
            let { message, image, postTime } = updatedData;
            let post = await postModel.findOne({ _id: postId, userId: userId });
            post.message = message;
            post.image = image;
            post.postTime = postTime;
            return await post.save();

        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async delete(userId, postId) {
        try {
            await postModel.findByIdAndDelete(postId);
            return await UserModel.updateOne(
                { _id: userId },
                {
                    '$pull': {
                        posts: {
                            postId: postId
                        }
                    }
                }
            )
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}