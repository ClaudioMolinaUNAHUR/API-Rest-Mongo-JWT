import 'dotenv/config';
import './database/connectdb.js'; // import en Node de archivos, declarar la extension
import express  from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import linkRoutes from './routes/link.route.js';
import redirectRoutes from './routes/redirect.route.js';


const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];
app.use(cors({
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            return callback(null, origin)
        }
        return callback('error de Cors' + origin + "no autorizado!")
    }
}))

app.use(express.json()); // habilito el uso de JSON
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/links', linkRoutes);

// EJEMPLO: back redirect opcional
app.use('/', redirectRoutes);

//test web
//app.use(express.static('public'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server Online 🔥🔥'));
