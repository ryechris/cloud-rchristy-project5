export const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveUsers(users) {
  console.log('RECEIVING USERS.........')
  return {
    type: RECEIVE_USERS,
    users
  }
}
