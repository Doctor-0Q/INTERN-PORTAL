
import mongoose from 'mongoose'
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;

const connectdb=async()=>{
    try{
        await mongoose.connect(MONGODB_URL)
        console.log("MongoDB connected")
    }
    catch(error){
        console.log(error)
    }
}

export default connectdb;
