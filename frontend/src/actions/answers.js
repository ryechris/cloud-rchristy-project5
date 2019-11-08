import { saveQuestionAnswer } from '../utils/api.js'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_ANSWER = 'ADD_ANSWER'

function addAnswer (ans) {
  return {
    type: ADD_ANSWER,
    ans
  }
}

export function handleAddAnswer (ans) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestionAnswer(ans)
      .then(() => dispatch(addAnswer(ans)))
      .then(() => dispatch(hideLoading()))
  }
}


/*

const ans = {
  ar: {
    authedUser,
    answer,
    id: question.id
  },
  tbs
}

this.props.dispatch(handleAddAnswer({
  authedUser,
  answer,
  id: question.id
}))
}
*/
