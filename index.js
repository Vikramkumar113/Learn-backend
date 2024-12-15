import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./Routes/userRoutes.js"
import todoRoutes from "./Routes/todoRoutes.js"

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI);

app.use('/api', userRoutes);
app.use('/api', todoRoutes);

app.listen(process.env.PORT, ()=>{
  console.log(` app is running on port ${process.env.PORT}`)
})
