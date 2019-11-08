import { ADD_ANSWER } from '../actions/answers'

export default function dataTBS (state = {}, action)  {
  switch(action.type) {
    case ADD_ANSWER :
      console.log('ADD_ANSWER II. useranswers')
      return {
        ...state,
        [action.ans.ar.id]: action.ans.ar.answer
      }
    default :
      return state
  }
}
