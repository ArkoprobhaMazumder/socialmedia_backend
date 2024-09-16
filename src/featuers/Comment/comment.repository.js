import ApplicationError from "../../utils/errorHandler.js";
import commentModel from "./comment.schema.js";
import postModel from "../Post/post.schema.js";
import { ObjectId } from "mongodb";


export default class CommentRepository {


    async add(userId, commentData) {
        try {
            let { postId, comment, time } = commentData;
            let newComment = new commentModel({ userId: new ObjectId(userId), postId: new ObjectId(postId), comment: comment, time: time });
            let userComment = await newComment.save();
            await postModel.updateOne(
                { _id: postId },
                {
                    '$push': {
                        comments: {
                            userId: new ObjectId(userId),
                            commentId: new ObjectId(userComment._id),
                            time: time
                        }
                    }
                }
            )
            return userComment;
        } catch (error) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async get(commentId, postId) {
        try {
            return await commentModel.findOne({ _id: commentId, postId: postId });
        } catch (error) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async delete(postId, commentId) {
        try {
            await commentModel.findByIdAndDelete({ _id: commentId });
            let post = await postModel.findById(postId);
            let postCommentList = [];
            post.comments.forEach((comment) => {
                if (comment.commentId.toString() != commentId) {
                    postCommentList.push(comment);
                }
            })
            post.comments = postCommentList;
            return await post.save();
        } catch (error) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }


    async update(commentId, comment) {
        try {
            return await commentModel.findOneAndUpdate({ _id: commentId },
                {
                    comment: comment
                }
            );
        } catch (error) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }

}