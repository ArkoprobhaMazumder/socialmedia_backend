import FriendRepository from "./friends.repository.js";




export default class FriendController {


    constructor() {
        this.friendsRepository = new FriendRepository();
    }

    async sendReqest(req, res, next) {
        try {
            let userId = req.userId;
            let { friendUserId } = req.body;
            if (userId == friendUserId) {
                return res.status(400).send("Invalid Action");
            }
            let time = new Date().toISOString();
            let result = await this.friendsRepository.sendFriendRequest(userId, friendUserId, time);
            if (!result) {
                return res.status(400).send("No matches found");
            } else {
                return res.status(201).send("Request Send");
            }
        } catch (error) {
            next(error);
        }
    }

    async acceptRequest(req, res, next) {
        try {
            let userId = req.userId;
            let { reqUserId } = req.query;
            let time = new Date().toISOString();
            let result = await this.friendsRepository.acceptFriendRequest(reqUserId, userId, time);
            if (!result) {
                return res.status(400).send("Invaid Action");
            } else {
                return res.status(200).send("Accepted");
            }
        } catch (error) {
            next(error);
        }
    }

}