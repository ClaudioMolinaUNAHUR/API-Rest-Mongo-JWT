import 'dotenv/config';
import './database/connectdb.js'; // import en Node de archivos, declarar la extension
import express  from "express";
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json()); // habilito el uso de JSON

app.use(cookieParser())

app.use('/api/v1/auth', authRoutes);

//test web
app.use(express.static('public'))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server Online 🔥🔥'))
