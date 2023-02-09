import 'dotenv/config';
import './database/connectdb.js'; // import en Node de archivos, declarar la extension
import express  from "express";
import authRoutes from './routes/auth.route.js';


const app = express();
app.use(express.json()); // habilito el uso de JSON

app.use('/api/v1/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server Online 🔥🔥'))
