import jwt from 'jsonwebtoken';

export const generateToken = (uid) => {
    const expiresIn = 60 * 15
    try {
        const token = jwt.sign({uid}, process.env.JWT_SECRET, { expiresIn });
        return {token, expiresIn};
    } catch (error) {
        console.log(error);
    }
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        const refreshToken = jwt.sign({uid}, process.env.JWT_REFRESH, { expiresIn });
        
        // este refreshtoken, solo valida la seccion ,
        // al no existen token valido en el nav, no se puede consultar desde el nav, sin que el servidor haga la comprobacion por cors
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            secure: process.env.MODO !== "developer", // en desarrollo trabaja en http
            expires: new Date(Date.now() + expiresIn * 1000) // trabaja en milisegundos
        });

    } catch (error) {
        console.log(error);
    }
}

export const tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es válida",
    "jwt expired": "JWT expirado",
    "invalid token": "Token no válido",
    "No Bearer": "Utiliza formato Bearer",
    "jwt malformed": "jwt formato no valido"
};
