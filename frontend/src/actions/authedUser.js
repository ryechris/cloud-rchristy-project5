import { addUser } from '../utils/api.js'
import { showLoading, hideLoading } from 'react-redux-loading'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  }
}

function formatUser ({ id, name, avatarURL }) {
  return {
    id,
    name,
    avatarURL,
    answers: {},
    questions: []
  }
}

export function handleAddUser(user) {
  return (dispatch, getState) => {
  // const { authedUser } = getState()
  dispatch(showLoading())
  console.log('THIS IS THE USER: ', user)
  return addUser(formatUser(user))
    .then(() => dispatch(setAuthedUser(formatUser(user).id)))
    .then(() => dispatch(hideLoading()))
  }
}
