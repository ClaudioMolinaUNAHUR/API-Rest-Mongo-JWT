import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/generateToken.js";

export const verifyToken = async (req, res, next) => {
    try {
        let bearerToken = req.headers["authorization"];
        if(!bearerToken) throw new Error('No Bearer');

        let token = bearerToken.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.id = payload.uid;

        next();
    } catch (error) {

        return res.status(401).json({error: tokenVerificationErrors[error.message]});
    }
};