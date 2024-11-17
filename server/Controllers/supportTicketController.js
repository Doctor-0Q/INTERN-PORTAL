import { Ticket } from "../Model/supportTicket.js";
import { sendEmail } from "./emailService.js";

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
  const {status, name, email}=req.body

  try {
    // Find the ticket and update its status to "closed"
    const updatedTicket = await Ticket.findOneAndUpdate(
      { ticketID: ticketID },
      { status: status },
      { new: true }
    );

    if (updatedTicket) {
      res.status(200).json({ success: true, message: "Ticket closed successfully" });
    } else {
      res.status(404).json({ success: false, message: "Ticket not found" });
    }

    try {
      if(status.toLowerCase==='closed'){
      var text = `Dear ${name},

We wanted to let you know that your recent query (Ticket ID: ${ticketID}) has been closed.

If you feel your issue is not fully addressed, please email us at support@docq.in or fill out this form for a quick response.

Thank you for reaching out to us, and we’re here to assist you whenever needed.

Best regards,
Support Team
DOC-Q`;
var subject="Your Ticket Query Has Been Closed"
      }else if(status.toLowerCase==='solved'){
        var text = `Dear ${name},

        We’re writing to inform you that your recent query (Ticket ID: ${ticketID}) has been marked as solved.

If you think your issue is not fully resolved, you can email us at support@docq.in or fill out this form for a quick response - https://www.docqinternportal.live/contact-us.

Thank you for contacting us, and we’re always here to assist you further.
        
        Best regards,
        Support Team
        DOC-Q`;
        var subject="Your Ticket Query Has Been Marked as Solved"
      }
      await sendEmail(
        email, // Recipient email from the request body
        subject,
        text
      );
      console.log("Email sent successfully to", email);
    } catch (emailError) {
      console.error("Error sending email:", emailError.message);
      return res.status(500).json({ success: false, message: "Failed to send email notification." });
    }
  } catch (error) {
    console.error("Error closing ticket:", error);
    res.status(500).json({ success: false, message: "Failed to close ticket" });
  }
};


