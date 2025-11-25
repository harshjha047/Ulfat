const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 2525, // <--- CHANGE TO 2525
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      family: 4, // <--- FORCE IPv4 (Vital)
      logger: true,
      debug: true,
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
