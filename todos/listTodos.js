
//Import the Dynamo client
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    const username = 'in28minutes'
    
    var params = {
        'TableName' : process.env.TODO_TABLE,
        'FilterExpression' : 'username = :username',
        'ExpressionAttributeValues' : {':username': username}
    };
    
    const results = await dynamo.scan(params).promise(); 
    
    const statuCode = 200;
    const body = JSON.stringify(results.Items);
    const headers = {"access-control-allow-origin":"*"};
    
    const response = {
        statusCode: statuCode,
        body: body,
        headers : headers
    };
    return response;
};
