var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: '127.0.0.1',
  port: 25
});

exports.sendMail = (user) =>{
  const mailOptions = {
    from: 'mario@gmail.com',
    to: 'mario@yahoo.com',
    subject: 'New Cat was adopted',
    text: `New cat was addopted from ${user.username}. Please contact him on phone ${user.phone}.
     Location: ${user.location}`
  }
  
return transporter.sendMail(mailOptions)
}