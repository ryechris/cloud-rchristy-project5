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

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    // const { authedUser } = getState()
    dispatch(showLoading())
    console.log('THIS IS THE QUESTION: ', question)
    return saveQuestion(formatQuestion(question))
      .then(() => dispatch(addQuestion(formatQuestion(question))))
      .then(() => dispatch(hideLoading()))
  }
}




/*

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


  {
    optionOneText: this.state.optionOne,
    optionTwoText: this.state.optionTwo,
    author: this.props.authedUser
  }

  {
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
 */
