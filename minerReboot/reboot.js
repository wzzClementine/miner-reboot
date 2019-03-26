var AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: "xxxxxxxxxxxxxxxxxxxx",
    secretAccessKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
});

var iotdata = new AWS.IotData({endpoint: 'a1s6wepkits1h3-ats.iot.ap-southeast-1.amazonaws.com'});

exports.handler = function(event, context) {
 
    var params = {
        topic: 'rebootCommand',
        payload: 'blah',
        qos: 0
        };
        
 
    iotdata.publish(params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            console.log("success?");
            //context.succeed(event);
        }
    });
    
};