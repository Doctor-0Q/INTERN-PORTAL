import {Intern} from '../Model/Intern.js'
import dbConnect from '../ConnectionDB/connectionDB.js'

export const updateDocumentAccess = async (req, res) => {
    await dbConnect();
    try {
      const { internIds, documentType } = req.body;
      
      // First, remove access from all interns
      await Intern.updateMany(
        {},
        { 
          [documentType === 'appreciation' 
            ? 'canDownloadAppreciation' 
            : 'canDownloadLOR']: false 
        }
      );
  
      // Then, grant access to selected interns
      await Intern.updateMany(
        { internID: { $in: internIds } },
        { 
          [documentType === 'appreciation' 
            ? 'canDownloadAppreciation' 
            : 'canDownloadLOR']: true 
        }
      );
  
      res.status(200).json({
        success: true,
        message: 'Document access updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update document access',
        error: error.message
      });
    }
  };
  