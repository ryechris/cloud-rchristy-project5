import { saveQuestionAnswer } from '../utils/api.js'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_ANSWER = 'ADD_ANSWER'

function addAnswer ({ authedUser, id, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    id,
    answer
  }
}

export function handleAddAnswer (answerData) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestionAnswer(answerData)
      .then(() => dispatch(addAnswer(answerData)))
      .then(() => dispatch(hideLoading()))
  }
}


/*
this.props.dispatch(handleAddAnswer({
  authedUser,
  answer,
  id: question.id
}))
}
*/
