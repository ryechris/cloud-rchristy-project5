import { saveQuestion } from '../utils/api.js'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    console.log('THIS IS THE QUESTION: ', question)
    return saveQuestion({
      ...question,
      author: authedUser
    }).then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}
