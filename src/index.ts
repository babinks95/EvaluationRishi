import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import tacheRoutes from './routes/tacheRoutes';
import projetRoutes from './routes/projetRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/Projects', projetRoutes);
app.use ('/Taches', tacheRoutes);

const uri = process.env.MONGO_URI
mongoose.connect(uri as string)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})