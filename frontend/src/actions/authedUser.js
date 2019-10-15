import { addUser } from '../utils/api.js'
import { showLoading, hideLoading } from 'react-redux-loading'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const ADD_USER = 'ADD_USER'

export function setAuthedUser(id) {
  console.log('AUTHEDUSER.ID: ', id)
  return {
    type: SET_AUTHED_USER,
    id
  }
}

export function saveUser(user) {
  return {
    type: ADD_USER,
    user
  }
}

function formatUser ({ nickname, picture }) {
  console.log('ID: ', nickname)
  console.log('AVATARURL: ', picture)
  return {
    id: nickname,
    name: nickname,
    avatarURL: picture,
    answers: {},
    questions: []
  }
}

export function handleAddUser(user) {
  return (dispatch, getState) => {
  // const { authedUser } = getState()
  dispatch(showLoading())
  console.log('THIS IS THE USER: ', formatUser(user))
  return addUser(formatUser(user))
    .then(() => dispatch(saveUser(formatUser(user))))
    .then(() => dispatch(setAuthedUser(formatUser(user).id)))
    .then(() => dispatch(hideLoading()))
  }
}
