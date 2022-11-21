var nodemailer = require('nodemailer');

function sendEmail(mailOptions){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'susahaya24@gmail.com',
          pass: 'zmxfeepygbwgjinf'
        }
      });
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}

module.exports = sendEmail
