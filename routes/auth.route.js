import express  from "express";
import { infoUser, login, register, refreshToken, logout } from "../controllers/auth.controller.js";
import { bodyLoginValidator, bodyRegisterValidator} from "../middlewares/validationResultExpress.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRefreshToken } from "../middlewares/verifyRefreshToken.js";
const router = express.Router();

router.post('/register', bodyRegisterValidator, register);

router.post('/login', bodyLoginValidator, login);

router.get('/protected', verifyToken, infoUser);
router.get('/refresh', verifyRefreshToken, refreshToken); //solo se usa para que las protegidas hagan el primero fetch y obtener el token de RAM

router.get('/logout', logout);

export default router; // export default, me deja cambiar nombre al importar