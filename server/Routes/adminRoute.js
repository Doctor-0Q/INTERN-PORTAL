import express from 'express';
import { adminLogin } from '../Controllers/adminLogin.js';
import { Interns } from '../Controllers/AdminInternList.js';
import {tickets} from '../Controllers/AdminSupportTickets.js'
import { adminChangePass } from '../Controllers/adminChangePass.js';
import { Members } from '../Controllers/AdminMembersList.js';
import { deleteMembers } from '../Controllers/AdminDeleteMembers.js';
import { deleteIntern } from '../Controllers/AdminDeleteIntern.js';


const router = express.Router();

router.route('/adminLogin').post(adminLogin);
router.route('/internList').get(Interns);
router.route('/supporttickets').get(tickets);
router.route('/changeAdminPassword/:username').post(adminChangePass);
router.route('/member-list').get(Members);
router.route('/member-list').post(Members);
router.route('/delete-members').delete(deleteMembers);
router.delete('/deleteIntern/:internId', deleteIntern);

export default router;
