//矿机维修成功后，重新开启矿机的重启权限;
/*注意修改key参数
Key: {
    "Location": {
        S: "shuikou"
    },
    "ID": {
        S: "192.168.1.9"
    }
},*/

const AWS = require("aws-sdk");
const dynamoDB_config = require("./config").dynamoDB_config;


AWS.config.update(dynamoDB_config);
const dynamodb = new AWS.DynamoDB();

const currentDay = new Date().getDate().toString();//获取当前日期
const currentHour = new Date().getHours().toString();//获取当前时间

console.log("矿机正在重新开启重启功能...");

const params = {
    ExpressionAttributeNames: {
        "#rf": "rebootingFlag",
        "#mf": "mainTainFlag",
        "#t": "firstTime",
        "#c": "count"
    },
    ExpressionAttributeValues: {
        ":c": {
            N: "0"
        },
        ":rf": {
            N: "1"
        },
        ":mf": {
            N: "0"
        },
        ":t":{
            "M": {
                "hour": {
                    "N": currentHour
                },
                "day": {
                    "N": currentDay
                }
            }
        },
    },
    Key: {
        "Location": {
            S: "shuikou"   //修改参数
        },
        "ID": {
            S: "192.168.1.9"  //修改参数
        }
    },
    ReturnValues: "ALL_NEW",
    TableName: "miner",
    UpdateExpression: "SET  #rf = :rf, #mf = :mf, #c = :c, #t = :t"
};
dynamodb.updateItem(params, function (err, data) {
    if (err){
        console.error("error:",JSON.stringify(err, null, 2));
    } else{
        console.log("矿机已经成功开启重启功能！",JSON.stringify(data, null, 2));

    }
});
