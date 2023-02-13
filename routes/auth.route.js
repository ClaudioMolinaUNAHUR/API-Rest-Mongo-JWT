import express  from "express";
import { infoUser, login, register, refreshToken, logout } from "../controllers/auth.controller.js";
import { body } from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router()

router.post('/register',[
    body('email', "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', "minimo 6 caracteres")
        .trim()
        .isLength({min: 6}),
    body('password', "formato de password incorrecto")
        .custom((value, {req}) => {
            if(value !== req.body.repassword){
                throw new Error("las password no coinciden")
            }
            return value
        })
    ],
    validationResultExpress, 
    register)

router.post('/login', [
    body('email', "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', "minimo 6 caracteres")
        .trim()
        .isLength({min: 6})
    ],
    validationResultExpress,
    login)

router.get('/protected', verifyToken, infoUser)
router.get('/refresh', refreshToken) //solo se usa para que las protegidas hagan el primero fetch y obtener el token de RAM
router.get('/logout', logout)

export default router; // export default, me deja cambiar nombre al importar