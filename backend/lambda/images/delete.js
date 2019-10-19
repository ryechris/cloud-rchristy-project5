import * as uuid from 'uuid'
import * as AWSXRay from 'aws-xray-sdk'
const AWS = require('aws-sdk');
const XAWS = AWSXRay.captureAWS(AWS)
const ddbdclient = new XAWS.DynamoDB.DocumentClient();
const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})

const groupsTable = process.env.GROUPS_TABLE
const imagesTable = process.env.IMAGES_TABLE
const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION


exports.handler = async (event) => {
  const imageId = uuid.v4()

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



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)
  const groupId = event.pathParameters.groupId
  const validGroupId = await groupExists(groupId)

  if (!validGroupId) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Group does not exist'
      })
    }
  }
  const newItem = await createImage(groupId, imageId, event)
  const url = getUploadUrl(imageId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newItem: newItem,
      uploadUrl: url
    })
  }
}


const newItem = {
  id: user,
  url: bucketUrl,
  imageId,
  timestamp,
}

const params = {
  TableName: process.env.IMAGES_TABLE,
  Item: newItem
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




async function createImage(groupId: string, imageId: string, event: any) {
  const timestamp = new Date().toISOString()
  const newImage = JSON.parse(event.body)

  const newItem = {
    groupId,
    timestamp,
    imageId,
    ...newImage,
    imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`
  }
  console.log('Storing new item: ', newItem)

  await docClient
    .put({
      TableName: imagesTable,
      Item: newItem
    })
    .promise()

  return newItem
}

function getUploadUrl(imageId: string) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: imageId,
    Expires: urlExpiration
  })
}
