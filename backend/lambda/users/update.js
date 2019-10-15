import * as AWSXRay from 'aws-xray-sdk'

const AWS = require('aws-sdk');

const XAWS = AWSXRay.captureAWS(AWS)

const ddbdclient = new XAWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const newQ = JSON.parse(event.body);
  const question = [newQ.id]

  const params = {

    TableName: process.env.USERS_TABLE,
    Key: {
      id: newQ.author
    },
    ExpressionAttributeNames: {
      '#q': 'questions'
    },
    ExpressionAttributeValues: {
      ':q': question
    },
    UpdateExpression: 'SET #q = list_append(#q, :q)',
    ReturnValues: 'ALL_NEW'

  }

  const result = await ddbdclient.update(params).promise()

  const attributes = result.Attributes

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(attributes)
  }


  // const result = await ddbdclient.update(params, (error, result) => {
  //   if (error) {
  //     console.error(error);
  //     callback(null, {
  //       statusCode: error.statusCode || 501,
  //       headers: { 'Content-Type': 'text/plain' },
  //       body: 'Opeation failed.',
  //     });
  //     return;
  //   }
  //   const response = {
  //     statusCode: 200,
  //     body: JSON.stringify(newQ),
  //   };
  //   callback(null, response);
  // });
};


/* const { authedUser, id, answer } = newAnswer */
exports.answer = async (event) => {
  const newAnswer = JSON.parse(event.body);
  const { authedUser, id, answer } = newAnswer;

  const params = {

    TableName: process.env.USERS_TABLE,
    Key: {
      id: authedUser
    },
    ExpressionAttributeNames: {
      '#s': 'answers'
    },
    ExpressionAttributeValues: {
      ':a': answer
    },
    UpdateExpression: 'SET #s.id = :a',
    ReturnValues: 'ALL_NEW'

  };

  const result = await ddbdclient.update(params).promise();

  const attributes = result.Attributes;

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(attributes)
  };

};





/*

// ddbdclient.update(params, (error, result) => {
//   if (error) {
//     console.error(error);
//     callback(null, {
//       statusCode: error.statusCode || 501,
//       headers: { 'Content-Type': 'text/plain' },
//       body: 'Opeation failed.',
//     });
//     return;
//   }
//   // you need to return the new question here
//   // try adding newQ here, see if it gets that far in terms of scope.
//   // if it doesn't, just find out what object result looks like, and what things it has.
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify(newAnswer),
//   };
//   callback(null, response);
// });

 */
