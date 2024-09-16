

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    message: String,
    image: {
        data: Buffer,
        type: String
    },
    postTime: String,
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            commentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            },
            time: String
        }
    ],
    likes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ]

});

const postModel = mongoose.model('Post', postSchema);
export default postModel;