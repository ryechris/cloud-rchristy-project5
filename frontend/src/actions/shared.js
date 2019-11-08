import { getInitialData } from '../utils/api.js'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_USER_ID = ''

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData().then(({ users, questions}) => {
      console.log('INITIAL DATA USERS: ', users)
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      dispatch(setAuthedUser(AUTHED_USER_ID))
      dispatch(hideLoading())
    })
  }
}
