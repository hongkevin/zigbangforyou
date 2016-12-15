var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var squel = require('squel');
var schedule = require('node-schedule');
var nodemailer = require('nodemailer');
var verifier = require('email-verify');
var sesTransport = require('nodemailer-ses-transport');

var config = ('../config/config');

// var emailForm = require('./udemy_email.html');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* email verify logic */
/*
verifier.verify(input, function(err, info) {
  if (err) {
    console.log(err);
    return err;
  } else {
    console.log("Success (T/F): " + info.success);
    console.log("Info : " + info.info);
    return info.success;
  }
});
*/

/* email setting */
/*
var transporter = nodemailer.createTransport(sesTransport({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  rateLimit: 5,
  region: 'us-west-2' // Oregon
}));
*/

/* email setting */
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.userEmail,
    pass: config.userPassword
    // user: '*****',
    // pass: '*****'
  }
});

var mailOptions = {
  from: '"직방포유_테스트" <syhong0714@gmail.com>', // sender address
  to: 'syhong0714syhong0714@gmail.com', // list of receivers
  subject: '직방포유_테스트', // Subject line
  text: '이것은 텍스트입니다.', // plaintext body
  html: '<br>이것은 테스트 메일입니다.<br>' // html body
};

var sendMail = transporter.sendMail(mailOptions, function(error, info) {
  if(error){
    return console.log(error);
  }
  console.log('Message sent: ' + info.response);
});

/* cronjob setting */
var j = schedule.scheduleJob('30 * * * *', function(){
  /*
  // var qBuilder_target = squel.select().from('emailTarget').toString();
  // email, local2, local3, deposit, rent

  // squel 로 쿼리 질의 - item 에서 "날짜 기준"으로 내가 지정한 "지역"과 "가격"을 고려한 방이 오픈되었는지 확인
  var email = "syhong0714@gmail.com";
  var start_time = "2016-12-05 00:00:00";
  var end_time = "2016-12-05 23:59:59";
  var local2 = "local2";
  var local3 = "local3";
  var deposit = 1000;
  var rent = 30;

  var qBuilder = squel.select().from('item')
    .where("created_at BETWEEN ? AND ?", start_time, end_time) // 오늘 올라온 따끈따끈한 방
    .where("deposit < ?", deposit) // 보증금
    .where("rent < ?", rent) // 원룸
    .where("local2 = ?", local2) // 지역 - 구
    .where("local3 = ?", local3) // 지역 - 동
    .order("view_count") // 조회수 높은 것으로 진행 -> 누르고 싶도록
    .limit(10);

  // 뭔가 연세대, 고려대, 이화여자대학교와 같이 대학교를 입력하거나
  // 지하철역을 입력해두면 좋을 것 같다

  var query = qBuilder.toString();

  if (result.length > 0) {
    sendMail(email, sendData);
  }
  */
  verifier.verify(mailOptions.to, function(err, info) {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log("Success (T/F): " + info.success);
      console.log("Info : " + info.info);
      if (info.success === true) {
        sendMail();
      } else {
        console.log(info.success || err);
      }
    }
  });
});

module.exports = router;