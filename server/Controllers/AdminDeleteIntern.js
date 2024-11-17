import dbConnect from '../ConnectionDB/connectionDB.js';
import { Intern } from '../Model/Intern.js';

export const deleteIntern = async (req, res) => {
    await dbConnect();
    const internId = req.params.internId;
    
    try {
      const deletedIntern = await Intern.findOneAndDelete({ internID: internId });
      
      if (!deletedIntern) {
        return res.status(404).json({
          success: false,
          message: "Intern not found"
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Intern deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
};