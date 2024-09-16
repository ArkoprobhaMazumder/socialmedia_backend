
import ApplicationError from "../../utils/errorHandler.js";
import { ObjectId } from "mongodb";
import UserModel from "./user.schema.js";
import mongoose from "mongoose";

export default class UserRepository {


    async register(userData) {
        try {
            let user = new UserModel(userData);
            return await user.save();
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            }
            else {
                throw new ApplicationError("Not Registered", 500);
            }
        }
    }

    async login(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw new ApplicationError("Something Went Wrong", 500);
        }
    }

    async reset(userId, password) {
        try {
            let result = await UserModel.findById({ _id: new ObjectId(userId) });
            result.password = password;
            await result.save();
        } catch (error) {
            if (err instanceof mongoose.Error.ValidationError) {
                throw err;
            }
            else {
                throw new ApplicationError("Something went wrong", 500);
            }
        }
    }

    async getOne(id) {
        try {
            return await UserModel.findById({ _id: new ObjectId(id) });
        } catch (error) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }

}