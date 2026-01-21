import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
console.log(process.env.GMAIL_USER,process.env.GMAIL_PASS);
const transporter = nodemailer.createTransport({
    service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Function to send an email
export const sendEmail = async (to, subject, text) => {
  console.log("Preparing to send email to:", to);
  const mailOptions = {         
     from: `"ShopSight" <${process.env.GMAIL_USER}>`,
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


