
//Import the Dynamo client
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    const id = event.pathParameters.id;
    const body = JSON.parse(event.body);
    
    const statuCode = 200;
    const headers = {"Access-Control-Allow-Origin":"*"};
    
    var params = {
        'TableName': process.env.TODO_TABLE,
        'Item': body
    };
    
    const results = await dynamo.put(params).promise(); 


    const response = {
        statusCode: statuCode,
        body: '',
        headers: headers
    };
    return response;
};
