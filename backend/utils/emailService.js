// utils/sendEmail.js
const nodemailer = require("nodemailer");

module.exports = async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};
