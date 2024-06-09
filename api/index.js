import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Base de datos conectada')
})
.catch((err)=>{
    console.log(err);
})
const app = express();


app.listen(3000, ()=>{
    console.log('Probando server en el puerto 3000 xd')
})