import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions'
import { ADD_ANSWER } from '../actions/answers'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      console.log('The question is: ', action.question)
      console.log('And ', action.question.optionOne)
      return {
        ...state,
        [action.question.id]: action.question
      }
    case ADD_ANSWER :
      const { answer, id, authedUser } = action.ans.ar
      const question = state[id]
      const votesKey = answer + 'Votes'
      console.log('ADD_ANSWER I. questions')
      return {
        ...state,
        [id]: {
          ...question,
          [votesKey]: question[votesKey].concat([authedUser])
        }
      }
    default :
      return state
  }
}
