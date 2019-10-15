import * as AWSXRay from 'aws-xray-sdk'

const AWS = require('aws-sdk');

const XAWS = AWSXRay.captureAWS(AWS)

const ddbdclient = new XAWS.DynamoDB.DocumentClient();

/* const { authedUser, id, answer } = newAnswer */
exports.handler = async (event) => {
  const newAnswer = JSON.parse(event.body);
  console.log('I. EVENT.BODY: ', newAnswer);
  const answerer = [newAnswer.authedUser];
  console.log('II. newAnswer.AuthedUser: ', answerer);

  const params = newAnswer.answer === 'optionOne'
    ? {
        TableName: process.env.QUESTIONS_TABLE,
        Key: {
          id: newAnswer.id
        },
        ExpressionAttributeNames: {
          '#option': 'optionOne'
        },
        ExpressionAttributeValues: {
          ':answerer': answerer
        },
        UpdateExpression: 'SET #option.votes = list_append(#option.votes, :answerer)',
        ReturnValues: 'ALL_NEW'
      }
    : {
        TableName: process.env.QUESTIONS_TABLE,
        Key: {
          id: newAnswer.id
        },
        ExpressionAttributeNames: {
          '#option': 'optionTwo'
        },
        ExpressionAttributeValues: {
          ':answerer': answerer
        },
        UpdateExpression: 'SET #option.votes = list_append(#option.votes, :answerer)',
        ReturnValues: 'ALL_NEW'
      };

  console.log('III. THE PARAMS: ', params);
  const result = await ddbdclient.update(params).promise();
  console.log('IV. RESULT OF THE AWAIT: ', result);
  const attributes = result.Attributes;
  console.log('V. RESULT.ATTRIBUTES: ', attributes);

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

1. optionTwo[votes]

2. optionTwo
#option
option.votes
option[votes]

ddbdclient.update(params, (error, result) => {
  if (error) {
    console.error(error);
    callback(null, {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Opeation failed.',
    });
    return;
  }
  // you need to return the new question here
  // try adding newQ here, see if it gets that far in terms of scope.
  // if it doesn't, just find out what object result looks like, and what things it has.
  const response = {
    statusCode: 200,
    body: JSON.stringify(newAnswer),
  };
  callback(null, response);
});

{
  id: generateUID(),
  timestamp: Date.now(),
  author,
  optionOne: {
    votes: [],
    text: optionOneText,
  },
  optionTwo: {
    votes: [],
    text: optionTwoText,
  }
}
    questions = {
      ...questions,
      [id]: {
        ...questions[id],
        [answer]: {
          ...questions[id][answer],
          votes: questions[id][answer].votes.concat([authedUser])
        }
      }
    }





 */
