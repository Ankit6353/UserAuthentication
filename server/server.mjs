import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js'

connectDB();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));

app.get('/', (req, res) => res.send("API Working"));

app.use('/api/auth', authRouter);

app.listen(port, () => console.log(`Server started on PORT:${port}`));
