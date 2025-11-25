const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // SSL Port
      secure: true, // Must be TRUE for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      family: 4, // Force IPv4
      logger: true, // Keep debug logs on
      debug: true,
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
