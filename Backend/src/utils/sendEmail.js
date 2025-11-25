const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com", // Brevo's Server
      port: 587,                      // Standard Port
      secure: false,                  // True for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your Brevo Login Email
        pass: process.env.EMAIL_PASS, // Your Brevo SMTP Key (starts with xsmtp...)
      },
    });

    console.log(`Attempting to send email to ${email} via Brevo...`);

    await transporter.sendMail({
      from: `"Ulfat-e-Odhani" <${process.env.EMAIL_USER}>`, // Must match verified sender in Brevo
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent. Error:", error);
  }
};

module.exports = sendEmail;