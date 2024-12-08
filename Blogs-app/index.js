import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import routes from './Routes/userRoutes.js';

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI);

app.use('/api', routes);

app.listen(process.env.PORT, ()=>{
  console.log(`app is running on ${process.env.PORT}`)
})




