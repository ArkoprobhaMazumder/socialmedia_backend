import ApplicationError from "../../utils/errorHandler.js";
import UserModel from "../User/user.schema.js";
import { ObjectId } from "mongodb";


export default class FriendRepository {


    async sendFriendRequest(userId, friendUserId, time) {
        try {
            return await UserModel.findByIdAndUpdate({ _id: friendUserId },
                {
                    '$push': {
                        friendRequests: {
                            userId: new ObjectId(userId),
                            time: time,
                            accept: false
                        }
                    }
                }
            )
        } catch (error) {
            new ApplicationError("Something went Wrong", 500);
        }
    }

    async acceptFriendRequest(reqUserId, userId, time) {
        try {

            await UserModel.findByIdAndUpdate({ _id: userId },
                {
                    '$push': {
                        friends: {
                            userId: new ObjectId(reqUserId),
                            time: time
                        },
                    }
                }
            )
            await UserModel.findByIdAndUpdate({ _id: reqUserId },
                {
                    '$push': {
                        friends: {
                            userId: new ObjectId(userId),
                            time: time
                        }
                    }
                }
            )
            return await UserModel.updateOne({ _id: userId },
                {
                    '$pull': {
                        friendRequests: {
                            userId: reqUserId
                        }
                    }
                }
            )
        } catch (error) {

            new ApplicationError("Something went Wrong", 500);
        }
    }
}