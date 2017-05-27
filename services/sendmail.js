var express = require("express");
var utils = require('../utils');



var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport

var smtpConfig = {
    host: 'smtp-mail.outlook.com',
    port: 465,
    secure: false, // use SSL
    auth: {
        user: 'parajithender@outlook.com',
        pass: 'Jithu@143'
    },
    tls: {
        ciphers: 'SSLv3'
    }
};
var transporter = nodemailer.createTransport(smtpConfig);
// setup email data with unicode symbols
var mailOptions = {
    from: 'jithender518@gmail.com', // sender address
    to: 'jithender518@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};
// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});


