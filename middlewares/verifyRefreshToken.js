import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/generateToken.js";

export const verifyRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if(!refreshTokenCookie) throw new Error('invalid token')

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        req.uid = uid
        next();
    } catch (error) {

        return res.status(401).json({error: tokenVerificationErrors[error.message]});    
    }
}