import axios from "axios";
import { validationResult, param } from "express-validator";
import { body } from 'express-validator';

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
};
export const bodyLinkValidator = [
    body('longLink', "formato link incorrecto")
        .trim()
        .notEmpty()
        .custom(async (value) => {
            try {
                value = addHttpsIf(value);

                await axios.get(value); // uso axios para validar si el link es funcional
                return value;
            } catch (error) {
                throw new Error('not found longLink 404');
            }
        }),
    validationResultExpress
]

export function addHttpsIf(longLink) {    
    if(!longLink.startsWith("https://")){
        longLink = 'https://' + longLink;
    }
    return longLink
}

export const bodyRegisterValidator = [
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
        }),
    validationResultExpress, 
];

export const paramsLinkValidator = [
    param('id', "Formato no valido(express validator)")
        .trim()
        .notEmpty()
        .escape(), //limpia script de los paramtros
    validationResultExpress,
]

export const bodyLoginValidator = [
    body('email', "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', "minimo 6 caracteres")
        .trim()
        .isLength({min: 6}),
    validationResultExpress
];

