const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: "inform.shakhawat@gmail.com",
      pass: "xzem ycdq siuw pqzo",
    },
  });
   
  
  async function sendUserMail(usermail , subject , opt){
    const info = await transporter.sendMail({
        from: 'ToDo App By Shakhawat',
        to: usermail,
        subject: subject,
        html: `<b>Your verification code is ${opt}</b>`, // HTML body
      });
  }

  module.exports = sendUserMail