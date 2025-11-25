const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // ⚠️ NETWORK FIXES START HERE ⚠️
      tls: {
        rejectUnauthorized: false
      },
      // 1. Force the server to use IPv4 (fixes the hang)
      family: 4, 
      
      // 2. Set strict timeouts so you don't wait 2 minutes
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 5000,    // 5 seconds
      socketTimeout: 10000,     // 10 seconds
      
      // 3. Enable debug logs so we see exactly where it stops
      logger: true,
      debug: true 
    });

    console.log(`Attempting to send email to ${email}...`);

    await transporter.sendMail({
      from: `"ulfat.e.odhani" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent. Error details:", error);
  }
};

module.exports = sendEmail;