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
