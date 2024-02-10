var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ashwinbettawar@gmail.com',
    pass: 'kpgssuvelikkqhin'
  }
});

function sendKey(email,key){
    const otp=key;                      //Math.floor(Math.random() * 10000);
    var mailOptions = {
    from: 'ashwinbettawar@gmail.com',
    to: email,
    subject: 'KEY FOR YOUR SAVED IMAGE ON SECURE DATA SHARE' ,
    text: 'Please do not share the secure key  with anyone! \n \n KEY: '+otp
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    }); 
}

module.exports = {
  sendKey
}