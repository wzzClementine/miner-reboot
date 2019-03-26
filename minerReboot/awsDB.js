//dynamoDB 功能测试
const AWS = require("aws-sdk");
const dynamoDB_config = require("./config").dynamoDB_config;

AWS.config.update(dynamoDB_config);

const dynamodb = new AWS.DynamoDB();

/*const params = {
    AttributeDefinitions: [
        {
            AttributeName: "Location",
            AttributeType: "S"
        },
        {
            AttributeName: "ID",
            AttributeType: "S"
        },
    ],
    KeySchema: [
        {
            AttributeName: "Location",
            KeyType: "HASH"
        },
        {
            AttributeName: "ID",
            KeyType: "RANGE"
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    },
    TableName: "miner"
};

//createTable

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table:", JSON.stringify(err, null, 2));

    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});*/




//insert

//获取当前日期
/*const date = new  Date();
const hour = date.getHours().toString();
const day = date.getDate().toString();

const item = {
    Item:{
        "Location":{
            S:"guyi"
        },
        "ID":{
            S:"192.168.101.133"
        },
        "count":{
            N:"0"
        },
        "firstTime":{
            M:{
                "day":{
                    N: day
                },
                "hour":{
                    N: hour
                }
            }
        },
        "rebootingFlag":{
            N:"1"
        },
        "mainTainFlag":{
            N:"0"
        },
        "whiteList":{
            N:"0"
        }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName:"miner"
};
console.log("Adding new item to the table_miner...")
dynamodb.putItem(item, function (err, data) {
    if (err){
        console.error("error:",JSON.stringify(err, null, 2));
    }else{
        console.log("Successful:",JSON.stringify(data, null, 2));
    }
});*/


//get the item
const params2 = {
    Key: {
        "Location": {
            S: "guyi"
        },
        "ID": {
            S: "192.168.101.100"
        }
    },
    TableName: "miner"
};
const data1 = {}
dynamodb.getItem(params2, function (err, data) {
    if (err){
        console.error("error:",JSON.stringify(err, null, 2));
    } else{
        console.log("data:",JSON.stringify(data.Item, null, 2));

    }
});


//scan
 /*const param3 = {
    TableName:"miner"
};
dynamodb.scan(param3, function (err, data) {
    if (err){
        console.error("error:", JSON.stringify(err, null, 2));
    } else{
        console.log("data:"+JSON.stringify(data, null, 2));
    }
});*/


