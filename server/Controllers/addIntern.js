import { Intern } from "../Model/Intern.js";
import {Certificate} from '../Model/certificateModel.js'

export const addIntern=async(req,res)=>{

  const {certificateId}=req.body;


    try {
        const internData = new Intern(req.body);
        await internData.save();
        const saveCertificate=new Certificate({certificateId:certificateId});
        await saveCertificate.save()
        res.status(201).json({success:true, message: 'Intern data saved successfully', internData });
      } catch (error) {
        console.error('Error saving intern data:', error);
        res.status(500).json({success:false, message: 'Error saving intern data', error });
      }
}

