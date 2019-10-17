import { addAnswer } from '../../businessLogic/questions'

/* const { authedUser, id, answer } = newAnswer */
exports.handler = async (event) => {
  const newAnswer = JSON.parse(event.body)
  const attributes = await addAnswer(newAnswer)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(attributes)
  };
};
