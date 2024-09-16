
import jwt from "jsonwebtoken";
import { checkHashedPassword } from "../../utils/password.verification.js";
import UserRepository from "./user.repostory.js";
import UserModel from "./user.schema.js";

let secrect = process.env.SECRECT_KEY;
export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async registerUser(req, res, next) {
        try {
            let { name, email, password } = req.body;

            let user = await UserModel.findOne({ email: email });
            if (user) return res.status(400).send("Already User");


            let userData = {
                name: name.trim(),
                email: email.trim(),
                password: password
            }
            let newUser = await this.userRepository.register(userData);
            if (!newUser) {
                return res.status(400).send("Not registerd");
            }
            return res.status(201).send("Signup Successfull");

        } catch (error) {
            next(error);
        }
    }

    async loginUser(req, res, next) {
        try {
            let { email } = req.body;
            let user = await this.userRepository.login(email);
            if (!user) {
                return res.status(400).send("Invalid Credentials");
            }
            let result = await checkHashedPassword(req.body.password, user.password);
            if (!result) {
                return res.status(400).send("Invalid Credentials");
            }
            const token = jwt.sign({ userId: user._id, userName: user.name }, secrect, {
                expiresIn: '1h'
            });
            return res.status(200).cookie('userToken', token, {
                maxAge: 60 * 60 * 1000,
            }).send({ success: "Login", cookie: token });
        } catch (error) {
            next(error);
        }
    }


    async resetPassword(req, res, next) {
        try {
            let userId = req.userId;
            await this.userRepository.reset(userId, req.body.password);
            return res.status(201).send("Password Updated");
        } catch (err) {
            next(err);
        }
    }

    async getOneUser(req, res, next) {
        try {
            let result = await this.userRepository.getOne(req.params.id);
            if (!result) {
                return res.status(400).send("Invalid User");
            }
            return res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }

}