var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var squel = require('squel');
var schedule = require('node-schedule');
var nodemailer = require('nodemailer');

// var emailForm = require('./udemy_email.html');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* email setting */
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: '*****',
    pass: '*****'
  }
});

var mailOptions = {
  from: '"직방" <syhong0714@gmail.com>', // sender address
  to: 'syhong0714@gmail.com', // list of receivers
  subject: '직방포유', // Subject line
  text: '이것은 텍스트입니다.', // plaintext body
  html: emailForm // html body
};

var sendMail = transporter.sendMail(mailOptions, function(error, info) {
  if(error){
    return console.log(error);
  }
  console.log('Message sent: ' + info.response);
});

/* cronjob setting */
var j = schedule.scheduleJob('30 * * * *', function(){
  sendMail();
});

module.exports = router;