import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION } from '../actions/questions'
import { ADD_ANSWER } from '../actions/answers'
import { ADD_USER } from '../actions/authedUser'

export default function (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      console.log('RECEIVE_USERS action.users', action.users)
      return {
        ...state,
        ...action.users
      }
    case ADD_USER :
      return {
        ...state,
        [action.user.id]: {
          ...action.user,
          answers: Object.keys(action.user.answers)
        }
      }
    case ADD_QUESTION :
      const { author, id } = action.question
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id])
        }
      }
    case ADD_ANSWER :
      const user =  state[action.ans.ar.authedUser]
      console.log('ADDING ANSWER ADD ADD: ', state)
      console.log('ADD_ANSWER III. users')
      return {
        ...state,
        [action.ans.ar.authedUser]: {
          ...user,
          answers: user.answers.concat([action.ans.ar.id])
        }
      }
    default :
      return state
  }
}
