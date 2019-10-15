import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
import questions from './questions'
import auther from './auth'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  authedUser,
  users,
  questions,
  auther,
  loadingBar: loadingBarReducer
})
