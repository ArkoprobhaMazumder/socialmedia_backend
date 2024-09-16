import PostRepository from "./post.repository.js";


export default class PostController {

    constructor() {
        this.postRepository = new PostRepository();
    }

    async addUserPost(req, res, next) {

        try {
            let userId = req.userId;
            console.log(userId);
            let { message, time } = req.body;
            let result = await this.postRepository.addPost(userId, { message: message, image: req?.file?.filename, time: time });
            if (result) {
                return res.status(200).send("Post Created");
            } else {
                return res.status(400).send('not Created');
            }
        } catch (error) {
            next(error);
        }
    }

    async getUserPost(req, res, next) {
        try {
            let { userId } = req.query;
            let result = await this.postRepository.userPost(userId);
            if (result) {
                return res.status(200).send({ success: true, data: result })
            } else {
                return res.status(400).send("Failed to get posts");
            }
        } catch (error) {
            next(error);
        }
    }

    async updatePost(req, res, next) {
        try {
            let { message, postTime } = req.body;
            let userId = req.userId;
            let { postId } = req.query;
            let result = await this.postRepository.update(userId, postId, { message: message, image: req?.file?.filename, postTime: postTime });
            if (result) {
                return res.status(201).send("Post Updated");
            } else {
                return res.status(400).send("Updataion failed");
            }
        } catch (error) {
            next(error);
        }
    }

    async deletePost(req, res, next) {
        try {
            let userId = req.userId;
            let { postId } = req.query;
            let result = await this.postRepository.delete(userId, postId);
            console.log(result);
            if (result.modifiedCount > 0) {
                return res.status(200).send("Delete Successful");
            } else {
                return res.status(400).send("delete failed");
            }
        } catch (error) {
            next(error);
        }
    }

}