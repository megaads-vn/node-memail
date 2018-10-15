"use strict";
var dotenv = require('dotenv');
var nodemailer =  require('nodemailer'); 
var mailConfig = require('../../config/mail');
var path = require('path');
var ejs = require('ejs');

dotenv.load();
var config = dotenv.config();

var exports = module.exports = {};
exports.send = send;

function send(options) 
{
    if ( !options ) 
        throw new TypeError("Argument options is reuquire.");

    var transporter = _createTransporter();
    var subject = mailConfig.config_send_email[0].default[0].subject;
    if ( typeof options.subject !== "undefined" ) {
        subject = options.subject;
    }

    var listGroupConfig = mailConfig.config_send_email[1].groups;
    var listMailTo = [];
    if ( typeof options.groups !== "undefined" && options.groups in listGroupConfig ) {
        listMailTo = listGroupConfig[options.groups];
    } else {
        listMailTo = (typeof options.to !== "undefined") ? options.to : mailConfig.config_send_email[0].default[0].to;
    }
    
    var name = (typeof options.name !== "undefined") ? options.name : mailConfig.config_send_email[0].default[0].name;
    var sendMailOptions = {
        from: config.parsed.MAIL_USERNAME,
        to: '',
        subject: subject,
        text: name,
        html: ''
    };

    if ( listMailTo.length <= 0 ) 
        throw new TypeError("List receiver email not empty.");

    listMailTo.forEach(function(item) {
        sendMailOptions.to = item;
        if ( typeof options.view !== "undefined") {
            var templateDir = path.join(__dirname , '../../templates', options.view);
            ejs.renderFile(templateDir, options.data, function(err, results) {
                if ( err )
                    return console.log(err);
                
                sendMailOptions.html = results;
                transporter.sendMail(sendMailOptions, function(err, info) {
                    if ( err ) {
                        console.log("Send email " + item + " not success. " + err);
                    } else {
                        return "Mail send successed. " + info.response;
                    }
                });
            });
        } else if ( typeof options.content !== "undefined") {
            sendMailOptions.html = options.content;
            transporter.sendMail(sendMailOptions, function(err, info) {
                if ( err ) {
                    console.log("Send email " + item + " not success. " + err);
                } else {
                    return "Mail send successed. " + info.response;
                }
            });
        }
    });

}


function _createTransporter() {
    var configMail = {
        host: config.parsed.MAIL_HOST,
        port: config.parsed.MAIL_PORT,
        secure: config.parsed.MAIL_SECURE,
        auth: {
            type: 'OAuth2',
            user: config.parsed.MAIL_USERNAME,
            clientId: config.parsed.GOOGLE_CLIENT_ID,
            clientSecret: config.parsed.GOOGLE_CLIENT_SECRET,
            refreshToken: config.parsed.GOOGLE_REFRESH_TOKEN,
            accessToken: config.parsed.GOOGLE_ACCESS_TOKEN,
            expires: 1484314697598
        }
    };
    var transporter = nodemailer.createTransport(configMail);
    transporter.verify(function(error, success) {
        if (error) {
            console.log("Verify unsccessful. Error " + error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });
    return transporter;
}