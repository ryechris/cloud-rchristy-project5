import * as AWSXRay from 'aws-xray-sdk'
const AWS = require('aws-sdk');
const XAWS = AWSXRay.captureAWS(AWS)

export class QAccess {
  constructor(questionsTable) {
    this.ddbdclient = new XAWS.DynamoDB.DocumentClient();
    this.questionsTable = questionsTable;
  };

  async getQuestionList() {
    console.log('dataLayer, getting questions')
    const params = {
      TableName: this.questionsTable,
    }
    const result = await this.ddbdclient.scan(params).promise()
    const items = result.Items
    return items
  }

  async addAnswer(newAnswer) {
    const answerer = [newAnswer.authedUser];
    const params = newAnswer.answer === 'optionOne'
      ? {
          TableName: this.questionsTable,
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
          TableName: this.questionsTable,
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
    const result = await this.ddbdclient.update(params).promise();
    const attributes = result.Attributes;
    return attributes;
  }

  async addQuestion(newQ) {
    const params = {
      TableName: this.questionsTable,
      Item: newQ
    }
    await this.ddbdclient.put(params, (error) => {
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
    return newQ
  }

}
