import mongoose from 'mongoose';
import 'dotenv/config'; // OPCIONAL, SOLO PARA SER EXPLICITO, usando MODULE, se puede usar cuando es llamado desde index.js

mongoose.set('strictQuery', false);

try {
    await mongoose.connect(process.env.URI);
    console.log('db conectada 🚀')
} catch (error) {
    console.log('no se pudo conectar a la DB:' + error)
}