import mongoose, { mongo } from "mongoose"

const certificateSchema=new mongoose.Schema({
    certificateId:{
        type:String,
        require:true
    }
},{timestamps:true});

export const Certificate = mongoose.model('certificateID',certificateSchema)