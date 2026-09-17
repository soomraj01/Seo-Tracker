import express from 'express';
import cors from 'cors'
import connectDB from './cofig/db.js';
import "dotenv/config";
import authRouter from './route/authRoutes.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Server is runing")
})

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server is running at ${PORT}`))