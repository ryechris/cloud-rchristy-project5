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
  const imageId = uuid.v4()

  const bUrl = await addImage(imageId, event)

  const pUrl = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: imageId,
    Expires: 300
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadUrl: pUrl,
      bUrl
    })
  }
}

async function addImage(imageId, event) {
  const timestamp = new Date().toISOString();
  const {user} = JSON.parse(event.body);
  console.log('json user: ', user)
  const bUrl = `https://${bucketName}.s3.amazonaws.com/${imageId}`
  const newItem = {
    id: user,
    url: bUrl,
    imageId,
    timestamp,
  }
  const params = {
    TableName: imagesTable,
    Item: newItem
  }
  await ddbdclient.put(params).promise()
  return bUrl
}
