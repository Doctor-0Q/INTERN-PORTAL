export const ticketEmailTemplates = {
    closed: (name, ticketID) => ({
      subject: "Your Ticket Query Has Been Closed",
      text: `Dear ${name},
  
  We wanted to let you know that your recent query (Ticket ID: ${ticketID}) has been closed.
  
  If you feel your issue is not fully addressed, please email us at support@docq.in or fill out this form for a quick response.
  
  Thank you for reaching out to us, and we're here to assist you whenever needed.
  
  Best regards,
  Support Team
  DOC-Q`
    }),
    
    solved: (name, ticketID) => ({
      subject: "Your Ticket Query Has Been Marked as Solved",
      text: `Dear ${name},
  
  We're writing to inform you that your recent query (Ticket ID: ${ticketID}) has been marked as solved.
  
  If you think your issue is not fully resolved, you can email us at support@docq.in or fill out this form for a quick response - https://www.docqinternportal.live/contact-us.
  
  Thank you for contacting us, and we're always here to assist you further.
  
  Best regards,
  Support Team
  DOC-Q`
    })
};