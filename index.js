import './env.js';
import express from "express";
import bodyParser from 'body-parser';
import userRouter from './src/featuers/User/user.router.js';
import cookieParser from 'cookie-parser';
import ApplicationError from './src/utils/errorHandler.js';
import mongoose from 'mongoose';
import postRouter from './src/featuers/Post/post.router.js';
import jwtTokenVerification from './src/utils/jwt.verification.js';
import commentRouter from './src/featuers/Comment/comment.router.js';
import likeRouter from './src/featuers/Like/like.router.js';
import userProfileRouter from './src/featuers/Userprofile/userProfile.router.js';
import friendRouter from './src/featuers/Friendship/friends.router.js';
import loggerMiddleware from './src/utils/loggerMiddleware.js';


// configuring server
const server = express();

// configuring port
const Port = process.env.PORT || 4000;

// configuring body parser
server.use(bodyParser.json());

// configuring cookie
server.use(cookieParser());

// configure logger for requests
server.use(loggerMiddleware);

// Api routes
server.use('/api/users', userRouter);
server.use('/api/posts', jwtTokenVerification, postRouter);
server.use('/api/posts/comment', jwtTokenVerification, commentRouter);
server.use('/api/like', jwtTokenVerification, likeRouter);
server.use('/api/userprofile', jwtTokenVerification, userProfileRouter);
server.use('/api/friends', jwtTokenVerification, friendRouter);


// Api default route
server.get('/', (req, res) => {
    res.status(200).send("Welcome to social media");
})

server.use((err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send(err.message);
    }
    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }
})

// Handle for unmatched request
server.use((req, res) => {
    res.status(404).send("Api not found");
})


export { server, Port };