import likeModel from "./like.schema.js";
import postModel from "../Post/post.schema.js";
import commentModel from "../Comment/comment.schema.js";
import { ObjectId } from "mongodb";
import ApplicationError from "../../utils/errorHandler.js";

export default class LikeRepository {


    async likePost(id, userId, type) {
        try {
            let exist = await likeModel.findOne({ userId: userId, likeable: id, types: type });
            if (!exist) {
                let like = new likeModel({
                    userId: new ObjectId(userId),
                    likeable: new ObjectId(id),
                    types: type
                })
                let newLike = await like.save();
                await postModel.findByIdAndUpdate({ _id: id },
                    {
                        '$push': {
                            likes: {
                                userId: new ObjectId(userId)
                            }
                        }
                    }
                )
                return newLike;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async likeComment(id, userId, type) {
        try {
            let exist = await likeModel.findOne({ userId: userId, likeable: id, types: type });
            if (!exist) {
                let like = new likeModel({
                    userId: new ObjectId(userId),
                    likeable: new ObjectId(id),
                    types: type
                })
                let newLike = await like.save();
                await commentModel.findByIdAndUpdate({ _id: id },
                    {
                        '$push': {
                            likes: new ObjectId(newLike._id)
                        }
                    }
                )
                return newLike;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

}