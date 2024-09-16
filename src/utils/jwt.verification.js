import jwt from "jsonwebtoken";

let secrect = process.env.SECRECT_KEY;
export default function jwtTokenVerification(req, res, next) {

    // check avaiable token
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(400).send("Unauthorized access");
    }

    try {
        // jwt verification
        let payload = jwt.verify(token, secrect);
        req.userId = payload.userId;
        req.userName = payload.userName;
    } catch (error) {
        return res.status(400).send("Invalid Credentials");
    }
    next();
}