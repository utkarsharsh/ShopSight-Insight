import nodemailer from "nodemailer";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Function to send an email
export const sendEmail = async (to, subject, text) => {
  const mailOptions = {         
    from: `"ShopSight" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text,
  };                
    try {       

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  } 
};


