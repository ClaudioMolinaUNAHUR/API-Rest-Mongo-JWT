import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/generateToken.js";
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
        const {token, expiresIn} = generateToken(user._id) // almacenado en memoria
        generateRefreshToken(user._id, res) // almacenado en cookie navegador

        return res.status(200).json({msg: "usuario agregado",token, expiresIn});
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
        const {token, expiresIn} = generateToken(user._id) // almacenado en memoria
        generateRefreshToken(user._id, res) // almacenado en cookie navegador
        
        return res.status(200).json({ token, expiresIn});
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ error: "Error de servidor"});
    }
}

const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.id).lean();
        return res.json({email: user.email, id: user._id});
    } catch (error) {
        console.log(error);
    }
}

const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.id);

        return res.json({ token, expiresIn });

    } catch (error) {

        return res.status(500).json({error: "error de server"});    
    }
}

const logout = (req, res) =>{
    res.clearCookie('refreshToken');
    res.json({ok: "sesion cerrada"})
}

export {
    register,
    login,
    infoUser,
    refreshToken,
    logout
}