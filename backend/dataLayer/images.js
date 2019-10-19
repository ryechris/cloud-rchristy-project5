import * as AWSXRay from 'aws-xray-sdk'
const AWS = require('aws-sdk');
const XAWS = AWSXRay.captureAWS(AWS)

export class IAccess {
  constructor(imagesTable) {
    this.ddbdclient = new XAWS.DynamoDB.DocumentClient();
    this.s3 = new XAWS.S3({signatureVersion: 'v4'});
    this.imagesTable = imagesTable;
  };

  async getBUrl(bucketName, imageId, event) {
    const timestamp = new Date().toISOString();
    const { user } = JSON.parse(event.body);
    const bUrl = `https://${bucketName}.s3.amazonaws.com/${imageId}`
    const newItem = {
      id: user,
      url: bUrl,
      imageId,
      timestamp,
    }
    const params = {
      TableName: this.imagesTable,
      Item: newItem
    }
    await this.ddbdclient.put(params).promise()
    return bUrl
  };

  async getPUrl(bucketName, imageId) {
    return this.s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: imageId,
      Expires: 300
    })
  };

  async pullImages(user) {
    const params = {
      TableName: this.imagesTable,
      KeyConditionExpression: 'id = :hkey',
      ExpressionAttributeValues: {
        ':hkey': user
      }
    };
    const result = await this.ddbdclient.query(params).promise();
    return result.Items
  };

  async getImages(user) {
    // check this here
    return await this.pullImages(user);
  };

  async userExists(user) {
    const checker = await this.pullImages(user);
    return (checker.length > 0)
  };

}
