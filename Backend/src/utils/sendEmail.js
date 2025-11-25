const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use 'host' and 'port' for other providers
      auth: {
        user: "ulfat.e.odhani@gmail.com", // Your actual Gmail
        pass: "tfjz gifu tqyh qpkf",  // The 16-char APP PASSWORD (not your login password)
      },
    });

    await transporter.sendMail({
      from: '"ulfat.e.odhani" <ulfat.e.odhani@gmail.com>',
      to: email,
      subject: subject,
      text: text, // Plain text body
      // html: "<b>Hello world?</b>" // You can add HTML here if you want styling
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent", error);
  }
};

module.exports = sendEmail;