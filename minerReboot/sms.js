//调用短信系统

const sms_config = require("./config").sms_config;
const AWS = require('aws-sdk');

AWS.config.update(sms_config);


function sms(Location, ID) {

    // construct SMS
    var SMSContent = Location+"矿场"+ID+"号矿机"+"重启次数已经达到上限，请及时处理！"
    // send SMS
    console.log(SMSContent);

    // Create publish parameters
    var params = {
        Message: SMSContent, /* required */
        PhoneNumber: '12265051767'
    };


    var sns = new AWS.SNS({apiVersion: '2010-03-31'});

    sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

    // send to zhenzhen
    var params = {
        Message: SMSContent, /* required */
        PhoneNumber: '8615111822807'
    };

    sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

    // send to aifeng
    var params1 = {
        Message: SMSContent, /* required */
        PhoneNumber: '8613678104188'
    };

    sns.publish(params1, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

    // send to peiru
    var params2 = {
        Message: SMSContent, /* required */
        PhoneNumber: '6593462400'
    };

    sns.publish(params2, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

    // send to hanjie
    var params3 = {
        Message: SMSContent, /* required */
        PhoneNumber: '8613572210706'
    };

    sns.publish(params3, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

    // send to menglv
    var params4 = {
        Message: SMSContent, /* required */
        PhoneNumber: '8615998968659'
    };

    sns.publish(params4, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

}

module.exports.sms = sms;

