const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Explicitly define the host
      port: 465,              // Use Port 465 (SSL)
      secure: true,           // "true" for port 465 (This is crucial)
      auth: {
        // ALWAYS use Environment Variables for security
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    await transporter.sendMail({
      from: `"ulfat.e.odhani" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: text, 
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent", error);
  }
};

module.exports = sendEmail;