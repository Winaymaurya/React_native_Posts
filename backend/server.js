import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from 'cors'
import morgan from "morgan";

import blogRoutes from './routes/blogRoutes.js'
import userRoutes from './routes/userRoutes.js'


const app=express();
dotenv.config()
app.use(express.json());
app.use(cors()) ;
app.use(morgan('dev'))


// Connecting Data base
const db= async()=>{
    try {
        await mongoose.connect(process.env.CLUSTER)
        console.log(`db is connected`);
    } catch (error) {
        console.log(`Error in mongodb${error}`);
    }
}
db();


// path ,routes
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/blog',blogRoutes);




// Port
const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`) 
})