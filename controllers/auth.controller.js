import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
//200: son mensajes exito
//300: son errores de redireccionamiento
//400: errores de solicitudes
//500: error de comunicacion de server

const register = async(req, res)=> {
    const {email, password} = req.body;
    try {
        //alternativa buscando por email 11000: es un codigo de mongoose para marcar duplicado
        let user = await User.findOne({email});
        if(user) throw { code: 11000 } // se puede mandar un objeto con throw directamente, luego lo captura el catch

        user = new User({ email, password});
        await user.save();

        //Generar JWT

        return res.status(200).json({msg: "usuario agregado"});
    } catch (error) {
        // alternativa por defecto mongoose
        if(error.code === 11000) return res.status(400).json({error: "ya existe este usuario"});

        return res.status(500).json({ error: "Error de servidor"}); 
    }
}

const login = async (req, res)=> {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(403).json({error: "no existe el usuario registrado"});

        const respuestaPassword = await user.comparePassword(password);
        if(!respuestaPassword) return res.status(403).json({error: "password incorrecta"});

        //Generar JWT
        const token = jwt.sign({uid: user._id}, process.env.JWT_SECRET);
        return res.status(200).json({token});
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ error: "Error de servidor"});
    }
}

export {
    register,
    login 
}