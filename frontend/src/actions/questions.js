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

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function handleAddQuestion(q) {
  const question = formatQuestion(q);
  return (dispatch, getState) => {
    dispatch(showLoading())
    console.log('THIS IS THE QUESTION: ', question)
    return saveQuestion(question)
      .then(() => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}
