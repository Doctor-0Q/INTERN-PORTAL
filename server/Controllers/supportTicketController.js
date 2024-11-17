import { Ticket } from "../Model/supportTicket.js";
import { sendEmail } from "./emailService.js";
import { ticketEmailTemplates } from "../util/ticketEmailTemplates.js";

// Controller to get all support tickets
export const getAllSupportTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find(); // Retrieve all tickets
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ success: false, message: "Failed to fetch tickets" });
  }
};

export const deleteTicket = async (req, res) => {
  const { ticketID } = req.params;

  try {
    // Find and delete the ticket by ticketID
    const deletedTicket = await Ticket.findOneAndDelete({ ticketID:ticketID });

    if (deletedTicket) {
      res.status(200).json({ success: true, message: "Ticket deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Ticket not found" });
    }
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ success: false, message: "Failed to delete ticket" });
  }
};

export const ticketUpdate = async (req, res) => {
  const { ticketID } = req.params;
  const { status, name, email } = req.body;

  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { ticketID },
      { status },
      { new: true }
    );

    if (!updatedTicket) {
      return handleResponse(res, 404, { 
        success: false, 
        message: "Ticket not found" 
      });
    }

    // Send email notification
    const statusLower = status.toLowerCase();
    if (['closed', 'solved'].includes(statusLower)) {
      try {
        const emailTemplate = ticketEmailTemplates[statusLower](name, ticketID);
        await sendEmail(email, emailTemplate.subject, emailTemplate.text);
        console.log("Email sent successfully to", email);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        return handleResponse(res, 500, { 
          success: false, 
          message: "Ticket updated but failed to send email notification",
          error: emailError.message 
        });
      }
    }

    handleResponse(res, 200, { 
      success: true, 
      message: `Ticket ${statusLower} successfully` 
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    handleResponse(res, 500, { 
      success: false, 
      message: "Failed to update ticket",
      error: error.message 
    });
  }
};


