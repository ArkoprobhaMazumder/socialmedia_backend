import LikeRepository from "./like.repository.js";


export default class LikeController {

    constructor() {
        this.likeRepository = new LikeRepository();
    }


    async addLike(req, res, next) {
        try {
            let { id, type } = req.query;
            let userId = req.userId;
            if (type != 'post' && type != 'comment') {
                return res.status(400).send("Invalid Type");
            }

            if (type == 'post') {
                let result = await this.likeRepository.likePost(id, userId, type);
                if (result) {
                    return res.status(201).send("Like added");
                } else {
                    return res.status(400).send("Already Liked");
                }
            } else {
                let result = await this.likeRepository.likeComment(id, userId, type);
                if (result) {
                    return res.status(201).send("Like added");
                } else {
                    return res.status(400).send("Already Liked");
                }
            }
        } catch (error) {
            next(error);
        }
    }
}