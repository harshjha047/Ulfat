const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      // Force IPv4
      connectionTimeout: 10000, // 10 seconds (don't wait 2 mins)
      dnsTimeout: 10000,
    });

    console.log("Attempting to send ema il...");

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
