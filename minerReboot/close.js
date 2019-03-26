//关闭矿机的重启权限

const AWS = require("aws-sdk");
const dynamoDB_config = require("./config").dynamoDB_config;

function closeRbt(Location, ID){
    AWS.config.update(dynamoDB_config);
    const dynamodb = new AWS.DynamoDB();


    console.log("正在关闭"+Location+ ID+"矿机的重启功能...");

    const params = {
        ExpressionAttributeNames: {
            "#rf": "rebootingFlag",
        },
        ExpressionAttributeValues: {
            ":rf": {
                N: "0"
            }
        },
        Key: {
            "Location": {
                S: Location
            },
            "ID": {
                S: ID
            }
        },
        ReturnValues: "ALL_NEW",
        TableName: "miner",
        UpdateExpression: "SET  #rf = :rf"
    };
    dynamodb.updateItem(params, function (err, data) {
        if (err){
            console.error("error:",JSON.stringify(err, null, 2));
        } else{
            console.log("已经成功关闭矿机"+Location+ID+"的重启功能！");


        }
    });
}

module.exports.closeRbt = closeRbt;

