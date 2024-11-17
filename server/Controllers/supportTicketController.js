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
      const text = `Dear ${name},

We hope this message finds you well.

We’re writing to inform you that your recent query (Ticket ID: ${ticketID}) has been resolved and the ticket has been closed.

If you feel that your issue has not been fully addressed or you need further assistance, please don’t hesitate to create a new ticket. Our team will be happy to help you.

Thank you for reaching out, and we look forward to assisting you in the future.

Best regards,
Support Team
DOC-Q`;
      await sendEmail(
        email, // Recipient email from the request body
        "Your Ticket Query Has Been Closed",
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


