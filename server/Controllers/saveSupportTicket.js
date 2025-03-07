import { Ticket } from "../Model/supportTicket.js";
import { Counter } from "../Model/counter.js";
import { sendEmail } from './emailService.js';

export const createSupportTicket = async (req, res) => {
    try {
      const { name, surname, email, subject, message, gender } = req.body;
      const counter = await Counter.findOneAndUpdate(
        { id: "ticketID" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true } // Create if doesn't exist
      );
  
      const newTicket = new Ticket({
        ticketID: counter.seq.toString().padStart(3, "0"),
        name,
        surname,
        email,
        subject,
        message,
        response: "",   
        gender,  
        resolved: false,
        status: "Pending"
      });
  
      await newTicket.save();
  
      res.status(201).json({ message: "Support ticket submitted successfully." });
    } catch (error) {
      console.error("Error creating support ticket:", error);
      res.status(500).json({ message: "An error occurred while creating the support ticket." });
    }
  };

  export const setTicketResponse=async(req,res)=>{
    try {
      
      const {ticketID}=req.params;
      const {response, email, name}=req.body;

      if (!ticketID || !response) {
        return res.status(400).json({ success: false, message: "Ticket ID and response are required." });
      }

      const updateTicket=await Ticket.findOneAndUpdate(
        {ticketID:ticketID},
        {response:response,
          resolved:true,
        },
        {new:true}
      );

      if(!updateTicket){
        return res.status(400).json({success:false,message:"There is some error while updating response"})
      }

      try {
        const text = `Dear ${name},

Thank you for reaching out to us.

 ${response} 

In the meantime, if you need further assistance or wish to provide additional information, feel free to reply to this email or contact us directly at support@docq.in.

Thank you for your patience and understanding.

Best regards,
Support Team
DOC-Q`;
        await sendEmail(
          email, // Recipient email from the request body
          "Your Ticket Query",
          text
        );
        console.log("Email sent successfully to", email);
      } catch (emailError) {
        console.error("Error sending email:", emailError.message);
        return res.status(500).json({ success: false, message: "Failed to send email notification." });
      }

      return res.status(200).json({success:true,message:"Ticket resolved successfully"})

    } catch (error) {
      return res.status(400).json({success:false,message:"Internal server error"})
    }
  }