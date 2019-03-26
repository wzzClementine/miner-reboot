//config.js

const config_tencent = {
    host: "xxxx",//腾讯云测试ssh
    port: 22,
    username: "root",
    password: "xxx"
};

const config_aliyun = {
    host: "xxxx",//阿里云测试ssh
    port: 22,
    username: "root",
    password: "xxxx"
};

//dynamoDB参数设置
var dynamoDB_config = {
    region: "xxxxx",
    //endpoint: "apigateway.ap-southeast-1.amazonaws.com",
    accessKeyId:"xxxxxxxxx",
    secretAccessKey:"xxxxxxxxxxxxxxx"
};

var sms_config = {
    accessKeyId: "xxxxxxxxxxxxxxx",
    secretAccessKey: "xxxxxxxxxx",
    region: "xxxxxxxxx"
};

module.exports.config_tencent = config_tencent;
module.exports.config_aliyun = config_aliyun;
module.exports.dynamoDB_config = dynamoDB_config;
module.exports.sms_config = sms_config;