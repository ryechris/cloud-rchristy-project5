import { addQuestion } from '../../businessLogic/questions'

exports.handler = async (event) => {
  console.log('LOOKIE HERE TOO event.body: ', event.body)
  const newQ = await addQuestion(JSON.parse(event.body))
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
