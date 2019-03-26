
const AWS = require("aws-sdk");
const dynamoDB_config = require("./config").dynamoDB_config;
const ssh = require("./sshConnection").ssh;

AWS.config.update(dynamoDB_config);
const dynamodb = new AWS.DynamoDB();

function update(Location,ID,count){

    //重启矿机
    console.log(Location+ID+"号矿机正在重启中...");
    ssh(Location, ID);
    //次数加1
    const countN = (count+1).toString();
    //更新数据
    const params = {
        ExpressionAttributeNames: {
            "#c": "count",
        },
        ExpressionAttributeValues: {
            ":t": {
                N: countN
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
        UpdateExpression: "SET #c = :t"
    };
    dynamodb.updateItem(params, function (err, data) {
        if (err){
            console.error("error:",JSON.stringify(err, null, 2));
        } else{
            console.log(Location+ID+"号矿机重启成功！.",JSON.stringify(data, null, 2));
        }
    });
}

module.exports.update = update;

