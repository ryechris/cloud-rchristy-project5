import { getUserList } from '../../businessLogic/users'

const objectmaker = (arr) => {
  let b = {};
  arr.forEach((x) => {
    b[x.id] = x;
  });
  return b;
}

exports.handler = async (event) => {
  const theitems = await getUserList()
  const items = objectmaker(theitems)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(items)
  }
}
