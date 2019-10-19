import * as uuid from 'uuid'
import * as AWSXRay from 'aws-xray-sdk'
const AWS = require('aws-sdk');
const XAWS = AWSXRay.captureAWS(AWS)
const ddbdclient = new XAWS.DynamoDB.DocumentClient();
const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})
const imagesTable = process.env.IMAGES_TABLE
const bucketName = process.env.IMAGES_S3_BUCKET

exports.handler = async (event) => {
  console.log('I. EVENT', event)
  const user = event.pathParameters.id
  console.log('II. USER', user)

  const userDoesExist = await userExists(user)

  if (!userDoesExist) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'That user does not exist'
      })
    }
  }

  var params = {
    TableName: imagesTable,
    KeyConditionExpression: 'id = :hkey',
    ExpressionAttributeValues: {
      ':hkey': user
    }
  };
  console.log('III. PARAMS', params)
  const result = await ddbdclient.query(params).promise()
  console.log('RESULT: ', result.Items)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(result.Items)
  }
}

async function userExists(userId) {
  var params = {
    TableName: imagesTable,
    KeyConditionExpression: 'id = :hkey',
    ExpressionAttributeValues: {
      ':hkey': userId
    }
  };
  const result = await ddbdclient.query(params).promise()
  return (result.Items.length > 0)
}
