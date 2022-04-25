
//Import the Dynamo client
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    const id = event.pathParameters.id
    
    var params = {
        'TableName': process.env.TODO_TABLE,
        'Key': { id }
    };
    
    const results = await dynamo.delete(params).promise(); 
    
    const statuCode = 200;
    const headers = {"Access-Control-Allow-Origin":"*"};

    const response = {
        statusCode: statuCode,
        body: '',
        headers: headers
    };
    return response;
};
