//与矿机建立ssh连接，执行reboot命令，实现重启const Client = require('ssh2').Client;const AWS = require("aws-sdk");const dynamoDB_config = require("./config").dynamoDB_config;AWS.config.update(dynamoDB_config);const dynamodb = new AWS.DynamoDB();function ssh(Location, ID, count){    const conn = new Client();    console.log("准备重启矿机："+ Location+ ID+"....");    conn.on('ready', function() {        console.log('成功连接矿机:'+Location+ID+"!");        const countN = (count+1).toString();        //更新数据        const params = {            ExpressionAttributeNames: {                "#c": "count",            },            ExpressionAttributeValues: {                ":t": {                    N: countN                }            },            Key: {                "Location": {                    S: Location                },                "ID": {                    S: ID                }            },            ReturnValues: "ALL_NEW",            TableName: "miner",            UpdateExpression: "SET #c = :t"        };        dynamodb.updateItem(params, function (err, data) {            if (err){                console.error("error:",JSON.stringify(err, null, 2));            } else{                console.log(Location+ID+"号矿机重启成功！");            }        });        conn.exec('/sbin/reboot', function(err, stream) {            if (err) throw err;            stream.on('close', function(code, signal) {                console.log(Location+ID+"号矿机SSH连接已经关闭");                conn.end();            }).on('data', function(data) {                console.log(Location+ID+'号矿机：' + data);            }).stderr.on('data', function(data) {                console.log('STDERR: ' + data);            });        });    }).on('error',function(err){       console.log("error occurred!");    }).connect({  //连接矿机的参数设置        host: ID,        port: 22,        username: "xxxx", //配置        password: "xxxx",//配置    });}module.exports.ssh = ssh;