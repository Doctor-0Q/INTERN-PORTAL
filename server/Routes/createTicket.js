import { createSupportTicket, setTicketResponse } from "../Controllers/saveSupportTicket.js";
import express from 'express'
import { ticketUpdate, deleteTicket, getAllSupportTickets } from "../Controllers/supportTicketController.js";

const router =express.Router();

router.route('/createTicket').post(createSupportTicket);
router.route('/tickets').get(getAllSupportTickets);
router.route('/ticketResolve/:ticketID').post(setTicketResponse);
router.route('/ticketDelete/:ticketID').post(deleteTicket);
router.route('/ticketUpdating/:ticketID').post(ticketUpdate);
export default router;