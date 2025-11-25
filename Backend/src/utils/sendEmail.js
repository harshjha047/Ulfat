const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,              // CHANGE TO 587
      secure: false,          // MUST BE FALSE for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // This helps prevent "Self Signed Certificate" errors on some cloud hosts
        rejectUnauthorized: false
      }
    });

    console.log("Attempting to send email...");

    await transporter.sendMail({
      from: `"ulfat.e.odhani" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: text, 
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent:", error.message);
  }
};

module.exports = sendEmail;