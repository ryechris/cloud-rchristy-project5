import { getBUrl, getPUrl } from '../../businessLogic/images'
import * as uuid from 'uuid'

const bucketName = process.env.IMAGES_S3_BUCKET

exports.handler = async (event) => {
  const imageId = uuid.v4()
  const bUrl = await getBUrl(bucketName, imageId, event)
  const pUrl = await getPUrl(bucketName, imageId)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      pUrl,
      bUrl
    })
  }
}
