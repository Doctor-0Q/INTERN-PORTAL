import {Intern} from '../Model/Intern.js'
import dbConnect from '../ConnectionDB/connectionDB.js'

export const updateDocumentAccess = async (req, res) => {
    await dbConnect();
    try {
      const { internIds, documentType } = req.body;
      
      const fieldMap = {
        certificate: 'canDownloadCertificate',
        appreciation: 'canDownloadAppreciation',
        lor: 'canDownloadLOR'
      };

      const updateField = fieldMap[documentType];

      // First update - set all to false
      const resetResult = await Intern.updateMany(
        {},
        { [updateField]: false }
      );

      // Second update - set selected to true
      const updateResult = await Intern.updateMany(
        { internID: { $in: internIds } },
        { [updateField]: true }
      );
      console.log('Update result:', updateResult);

  
      res.status(200).json({
        success: true,
        message: 'Document access updated successfully'
      });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update document access',
        error: error.message
      });
    }
  };
  