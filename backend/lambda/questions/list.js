import * as AWSXRay from 'aws-xray-sdk'

const AWS = require('aws-sdk');

const XAWS = AWSXRay.captureAWS(AWS)

const ddbdclient = new XAWS.DynamoDB.DocumentClient();

const objectmaker = (arr) => {
  let b = {};
  arr.forEach((x) => {
    b[x.id] = x;
  });
  return b;
}

exports.handler = async (event) => {
  const params = {
    TableName: process.env.QUESTIONS_TABLE,
  }
  const result = await ddbdclient.scan(params).promise()
  const theitems = result.Items
  const items = objectmaker(theitems)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(items)
  }
}

/*
function Objectifier (Array) {
  let B = {}

  Array.forEach(function(x) {
    B[x] = x
  })

  return B
}

src/actions/answer.js
saveQuestionAnswer

src/actions/questions.js
saveQuestion

actions/shared
getInitialData

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions()
  ]).then(([users, questions]) => {
    return {
      users: getTheUsers(users),
      questions: getTheQuestions(questions)
    }})
}

 */
