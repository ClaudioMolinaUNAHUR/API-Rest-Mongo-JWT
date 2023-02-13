import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let bearerToken = req.headers["authorization"];
        if(!bearerToken) throw new Error('No Bearer');

        let token = bearerToken.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.id = payload.uid;

        next();
    } catch (error) {

        const tokenVerificationErrors = {
            "invalid signature": "La firma del JWT no es válida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no válido",
            "No Bearer": "Utiliza formato Bearer",
            "jwt malformed": "jwt formato no valido"
        };

        return res.status(401).json({error: tokenVerificationErrors[error.message]});
    }
};