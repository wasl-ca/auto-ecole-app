// utils/sendSMS.js
const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

module.exports = function sendSMS(to, body) {
  return client.messages.create({
    body,
    from: process.env.TWILIO_PHONE,
    to,
  });
};
