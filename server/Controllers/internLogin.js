import {Intern} from '../Model/Intern.js'

export const internLogin =async(req,res)=>{
    try {
        const {internID,password}=req.body;

        const isInternExist= await Intern.findOne({internID:internID});
        if(!isInternExist){
           return res.status(400).json({success:false,message:"Incorrect ID or passsword"});
        }

        if(isInternExist.password!=password){
           return res.status(400).json({success:false,message:"Incorrect ID or password"})
        }

       return res.status(200).json({success:true,
         internName:(isInternExist.forename),
         gender:(isInternExist.gender),
         dateOfJoining:(isInternExist.dateOfJoining),
         role:(isInternExist.role),
         certificateId:(isInternExist.certificateId),
         projects:(isInternExist.project || "")
      })
    } catch (error) {
       return res.status(500).json({success:false,message:"Internal server error"})
    }
}