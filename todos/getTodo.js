    
    //Import the Dynamo client
    const AWS = require('aws-sdk');
    const dynamo = new AWS.DynamoDB.DocumentClient();
    
    exports.handler = async (event) => {
        
        const id = event.pathParameters.id
        
        var params = {
            'TableName': process.env.TODO_TABLE,
            'Key': { id }
        };
        
        const results = await dynamo.get(params).promise(); 
        
        const statuCode = 200;
        const body = JSON.stringify(results.Item)
        const headers = {"Access-Control-Allow-Origin":"*"};
    
        const response = {
            statusCode: statuCode,
            body: body,
            headers: headers
        };
        return response;
    };
