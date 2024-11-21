import express from 'express';
import {
  sendNotification,
  saveDraft,
  getDrafts,
  getSentMails,
  deleteDraft
} from '../Controllers/notificationController.js';

const router = express.Router();

router.post('/send', sendNotification);
router.post('/draft', saveDraft);
router.get('/drafts', getDrafts);
router.get('/sent', getSentMails);
router.delete('/draft/:id', deleteDraft);

export default router;
