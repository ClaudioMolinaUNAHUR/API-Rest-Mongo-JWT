import express  from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
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

router.get('/login', [
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

export default router; // export default, me deja cambiar nombre al importar