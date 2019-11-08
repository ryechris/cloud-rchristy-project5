import * as AWSXRay from 'aws-xray-sdk'
const AWS = require('aws-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

export class UserAccess {
  constructor(usersTable) {
    this.ddbdclient = new XAWS.DynamoDB.DocumentClient();
    this.usersTable = usersTable;
  };

  async getUserList() {
    console.log('dataLayer, getting users')
    const params = {
      TableName: this.usersTable,
    }
    const result = await this.ddbdclient.scan(params).promise()
    const items = result.Items
    return items
  }

  async addQuestion(newQ) {
    console.log('dataLayer, adding Question, users')
    const question = [newQ.id]
    const params = {
      TableName: this.usersTable,
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

    const result = await this.ddbdclient.update(params).promise()
    const attributes = result.Attributes
    return attributes
  }

  async addAnswer(newAnswer) {
    const { ar, tbs } = newAnswer
    const { authedUser } = ar
    const params = {
      TableName: this.usersTable,
      Key: {
        id: authedUser
      },
      ExpressionAttributeNames: {
        '#s': 'answers'
      },
      ExpressionAttributeValues: {
        ':a': tbs
      },
      UpdateExpression: 'SET #s = :a',
      ReturnValues: 'ALL_NEW'
    };
    const result = await this.ddbdclient.update(params).promise();
    const attributes = result.Attributes;
    return attributes
  }

  async addUser(newUser) {
    const params = {
      TableName: this.usersTable,
      Item: newUser
    }
    await this.ddbdclient.put(params, (error) => {
      if (error) {
        console.log(error)
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
    return newUser
  }

}
