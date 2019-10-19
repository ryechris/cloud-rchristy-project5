import * as uuid from 'uuid'
import { getImages, userExists } from '../../businessLogic/images'

const bucketName = process.env.IMAGES_S3_BUCKET

exports.handler = async (event) => {
  const user = event.pathParameters.id;

  const userDoesExist = await userExists(user);
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

  const items = await getImages(user);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(items)
  }
}
