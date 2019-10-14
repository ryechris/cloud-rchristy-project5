const AWS = require('aws-sdk');

const ddbdclient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log('LOOKIE LOOKIE HERE TOO event.body: ', event.body)
  const newQ = JSON.parse(event.body);

  const params = {
    TableName: process.env.QUESTIONS_TABLE,
    Item: newQ
  }

  await ddbdclient.put(params, (error) => {
    if (error) {
      console.log('THE ERROR LOOKIE HERE CMON: ', error)
      const reply = {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'item was not added.'
      }
      return reply;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };
  }).promise()

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      newQ
    })
  }

};
  
