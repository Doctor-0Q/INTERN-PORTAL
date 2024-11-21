import Notification from "../Model/Notification.js"
import { sendCommonEmail } from '../Controllers/emailService.js';

export const sendNotification = async (req, res) => {
    try {
      const { to, subject, body } = req.body;
  
      if (!to || !subject || !body) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }
  
      // Send email and get confirmation
      const emailResult = await sendCommonEmail(to, subject, body);
  
      // If email is sent successfully (messageId exists), save to database
      if (emailResult.messageId) {
        const notification = new Notification({
          to,
          subject,
          body,
          status: 'sent',
          sentAt: new Date(),
          messageId: emailResult.messageId
        });
        
        await notification.save();
        
        return res.status(200).json({ 
          success: true,
          message: 'Notification sent successfully',
          messageId: emailResult.messageId 
        });
      }
  
      return res.status(400).json({
        success: false,
        message: 'Email sending failed'
      });
  
    } catch (error) {
      return res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
};  

export const saveDraft = async (req, res) => {
    try {
        const { to, subject, body } = req.body;
        const draft = new Notification({
            to,
            subject,
            body,
            status: 'draft',
            createdAt: new Date()
        });
        
        const savedDraft = await draft.save();
        res.status(201).json({
            success: true,
            data: savedDraft
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getDrafts = async (req, res) => {
    try {
        const drafts = await Notification.find({ status: 'draft' });
        res.status(200).json({
            success: true,
            data: drafts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getSentMails = async (req, res) => {
  try {
    const sentMails = await Notification.find({ status: 'sent' })
      .sort({ sentAt: -1 });
    res.status(200).json(sentMails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDraft = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Draft deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
