

const AWS = require("aws-sdk");
const dynamoDB_config = require("./config").dynamoDB_config;
const closeRbt = require("./close").closeRbt;
const ssh = require("./sshConnection").ssh;

function reboot(Location, ID){

    AWS.config.update(dynamoDB_config);
    const dynamodb = new AWS.DynamoDB();

    const location = Location.toString();
    const id = ID.toString();

    const currentDay = new Date().getDate().toString();//获取当前日期
    const currentHour = new Date().getHours().toString();//获取当前时间

    const params = {
        Key: {
            "Location": {
                S: location
            },
            "ID": {
                S: id
            }
        },
        TableName: "miner"
    };

    dynamodb.getItem(params, function (err, data) {
        if (err){
            console.error("error:",JSON.stringify(err, null, 2));
        } else {
            //console.log("data:", JSON.stringify(data, null, 2));

            const day = data.Item.firstTime.M.day.N;//获取矿机第一次重启时间( 日 )
            const hour = data.Item.firstTime.M.hour.N;//获取矿机第一次重启时间（ 时间 ）
            const count = parseInt(data.Item.count.N);//获取矿机重启次数，并转换为整型
            const rebootingFlag = data.Item.rebootingFlag.N;/*获取矿机重启标志，为1则可重启
        (矿机人工维修成功后，需要将rebootingFlag置1)*/
            const mainTainFlag = data.Item.mainTainFlag.N;/*获取矿机维修标志，为0则可重启，为1则需要恢复数据
        (矿机人工维修成功后，需要将maintainFlag置1)*/
            const whiteList = data.Item.whiteList.N;//获取矿机白名单标记，为1表示属于白名单成员
            const Location = data.Item.Location.S;//获取矿机地理位置
            const ID = data.Item.ID.S;//获取矿机编号

            //根据重启标志位，判断是否允许重启
            if( rebootingFlag == 1){
                //console.log(Location+ID+"号矿机可以进行重启！");
                console.log(Location+ID+"号矿机申请重启！");
                if ( currentHour - hour != 0){
                    if (count <= 5) {
                        console.log("当前重启次数小于5，符合重启条件二！");
                        if(currentDay == day){
                            console.log("当前时差小于24，符合重启条件一！");
                            //调用重启&更新数据程序
                            ssh(Location,ID,count);
                        }else {
                            console.log("当前时差大于24，正在更新时间...");
                            //更新时间
                            const params = {
                                ExpressionAttributeNames: {
                                    "#t": "firstTime",
                                },
                                ExpressionAttributeValues: {
                                    ":t":{
                                        "M": {
                                            "hour": {
                                                "N": currentHour
                                            },
                                            "day": {
                                                "N": currentDay
                                            }
                                        }
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
                                UpdateExpression: "SET #t = :t"
                            };
                            dynamodb.updateItem(params, function (err, data) {
                                if (err){
                                    console.error("error:",JSON.stringify(err, null, 2));
                                } else{
                                    console.log(Location+ID+"号矿机时间更新成功！");
                                    //调用重启&更新数据程序
                                    ssh(Location,ID,count);
                                }
                            });
                        }
                    }else{
                        console.log(Location+ID+"号矿机重启次数已大于5，超过重启次数上限！即将关闭重启功能！");
                        //调用短信系统发短信,不能再重启
                        closeRbt(Location, ID);//关闭重启功能
                    }
                }else{
                    if(count < 5){
                        if (currentDay == day){
                            console.log("当前时差小于24，符合重启条件一！");
                            console.log("当前重启次数小于5，符合重启条件二！");
                            //调用重启&更新数据程序
                            ssh(Location,ID,count);
                        }else {
                            console.log("当前时差大于24，正在更新时间...");
                            //更新时间
                            const params = {
                                ExpressionAttributeNames: {
                                    "#t": "firstTime",
                                },
                                ExpressionAttributeValues: {
                                    ":t":{
                                        "M": {
                                            "hour": {
                                                "N": currentHour
                                            },
                                            "day": {
                                                "N": currentDay
                                            }
                                        }
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
                                UpdateExpression: "SET #t = :t"
                            };
                            dynamodb.updateItem(params, function (err, data) {
                                if (err){
                                    console.error("error:",JSON.stringify(err, null, 2));
                                } else{
                                    console.log(Location+ID+"号矿机时间更新成功！");
                                    //调用重启&更新数据程序
                                    ssh(Location,ID,count);
                                }
                            });
                        }
                    }else{
                        console.log(Location+ID+"号矿机重启次数已大于5，超过重启次数上限！即将关闭重启功能！");
                        //调用短信系统发短信,不能再重启
                        closeRbt(Location, ID);//关闭重启功能
                    }
                }
            }else{
                console.log(Location+ID+"号矿机由于故障已经关闭重启功能！");

            }
        }
    });
}

module.exports.reboot = reboot;