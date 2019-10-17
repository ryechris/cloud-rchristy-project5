import { addUser } from '../../businessLogic/users'

exports.handler = async (event) => {
  console.log('LOOK HERE event.body: ', event.body)
  const newUser = await addUser(JSON.parse(event.body))
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      newUser
    })
  }
};
