const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.AUTH_MAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });
   
  
  async function sendUserMail(usermail , subject , html){
    const info = await transporter.sendMail({
        from: 'ToDo App By Shakhawat',
        to: usermail,
        subject: subject,
        html , // HTML body
      });
  }

  module.exports = sendUserMail