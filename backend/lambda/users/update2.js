import { addQuestion, addAnswer } from '../../businessLogic/users'

exports.handler = async (event) => {
  const newQ = JSON.parse(event.body);
  const attributes = await addQuestion(newQ)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(attributes)
  }
};

/* const { authedUser, id, answer } = newAnswer */
exports.answer = async (event) => {
  const newAnswer = JSON.parse(event.body);
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
