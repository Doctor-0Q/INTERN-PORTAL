import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: 465,  // or 587 for TLS
  secure: true, 
  auth: {
    user: 'support@docq.in',  // Your Zoho email
    pass: 'q1mv17rRFss6'       // The full 12-character app-specific password
  }
});

const helloTransporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: 465,
  secure: true, 
  auth: {
    user: 'info@docq.in',
    pass: 'kG!pnaa7'  // Replace with actual password for hello@docq.in
  }
});

// Function to send email
const sendEmail = async (toEmail, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: 'support@docq.in',  // Sender email
      to: toEmail,              // Recipient email
      subject: subject,
      text: text              // Email body text
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

export { sendEmail };

export const sendCommonEmail = async (toEmail, subject, body) => {
  try {
    const emailWithSignature = `
    <div style="white-space: pre-line;">
      ${body}
    </div>  
    <br><br>
    Regards,
    <br>
    Doc-Q Team
    <br>
    <div style="text-align: left; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
      <img src="https://www.docqinternportal.live/assets/Logo-BCxl7uXG.png" alt="DocQ" style="max-width: 120px;">
    </div>
    <div style="background-color: #f5f5f5; border: 1px solid #ddd; padding: 10px; margin-top: 20px; border-radius: 4px;">
      <p style="color: #666; margin: 0 0 10px 0; font-size: 12px;">
        This mailbox is not monitored. For support, please contact support@docq.in
      </p>
      <a href="mailto:support@docq.in" 
         style="display: inline-block; 
                padding: 8px 16px; 
                background-color: #0066cc; 
                color: white; 
                text-decoration: none; 
                border-radius: 4px; 
                font-size: 12px;">
        Contact Support
      </a>
    </div>
    `;

    const recipients = Array.isArray(toEmail) ? toEmail : [toEmail];
    const info = await helloTransporter.sendMail({
      from: {
        name: 'DocQ',
        address: 'info@docq.in'
      },
      bcc: recipients.join(','),
      subject: subject,
      html: emailWithSignature,
      replyTo: 'no-reply@docq.in',
      headers: {
        'X-Auto-Response-Suppress': 'All',
        'Reply-To': 'no-reply@docq.in',
        'X-Failed-Recipients-Feedback': 'Email not sent. For support, please contact support@docq.in'
      }
    });
    
    console.log("Email sent:", info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      info: info
    };
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error; // Propagate error to caller
  }
}

