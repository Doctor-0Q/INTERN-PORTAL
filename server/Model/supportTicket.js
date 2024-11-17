import mongoose, { Mongoose } from "mongoose";


const supportSchema=new mongoose.Schema({
    ticketID:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    surname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default: Date.now, 
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    response: {
        type: String,
        default: ""
    },
    resolved: {
        type: Boolean,
        default: false 
    },
    gender:{
        type:String,
        default:"male"
    },
    status:{
        type:String
    }

});

export const Ticket = mongoose.model("SupportTicket",supportSchema)