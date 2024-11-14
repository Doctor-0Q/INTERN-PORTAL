import mongoose from 'mongoose';

const internSchema = new mongoose.Schema({
    internID: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        require:true
    },
    forename: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Working', 'Left', 'Terminated', 'On Leave'],
        default: 'Working'
    },
    contactNo: String,
    email: String,
    dateOfJoining: String,
    gender: String,
    role: String,
    performance: String,
}, { timestamps: true });

export const Intern = mongoose.model('interns', internSchema);