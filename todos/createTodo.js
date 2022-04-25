
//Import the Dynamo client
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const item = JSON.parse(event.body);
    
    if(!item.id || item.id === '-1'){
        item.id = Math.random() * Math.pow(10, 16) + ''; 
    }
    
    const statuCode = 200;
    const headers = {"Access-Control-Allow-Origin":"*"};
    
    var params = {
        'TableName': process.env.TODO_TABLE,
        'Item': item
    };
    
    const results = await dynamo.put(params).promise(); 


    const response = {
        statusCode: statuCode,
        body: '',
        headers: headers
    };
    return response;
};
