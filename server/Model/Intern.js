import mongoose from 'mongoose'

const InternSchema = new mongoose.Schema({
  internID: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  forename: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  performance: {
    type: String,
    required: false
  },
  alternateNumber: {
    type: String,
  },
  role: {
    type: String,
  },
  language: {
    type: String,
  },
  houseNo: {
    type: String,
  },
  street: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  certificateId: {
    type: String,
  },
  canDownloadCertificate: {
    type: String,
  },
  canDownloadLOR: {
    type: String,
  },
  leaveDate:{
    type:String
  }
}, { timestamps: true, strict: false }); 

export const Intern = mongoose.models.Intern || mongoose.model('Intern', InternSchema);