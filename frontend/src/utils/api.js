import Axios from 'axios'
import { apiEndpoint } from './config'

export async function saveQuestion(question) {
  console.log('SAVE QUESTION: ')
  const response = await Axios.post(`${apiEndpoint}/questions`, question)
  const response1 = await Axios.patch(`${apiEndpoint}/users/q`, question)

  console.log('THE RESPONSE HERE LOOK: ', response)
  console.log('RESPONSE BODY: ', response.body)
  console.log('RESPONSE DATA: ', response.data)
  console.log('RESPONSE DATAQ: ', response.data.newQ)
  console.log('RESPONSE1: ', response1)
  console.log('FUNCTION ENDS')
  return response.data.newQ;
  // return response
}

export async function addUser(user) {
  console.log('ADDING A NEW USER: ');
  const response = await Axios.post(`${apiEndpoint}/users`, user)
  return response.data.newUser
}

export async function saveQuestionAnswer(answer) {
  console.log('inside sQA')
  const response = await Axios.patch(`${apiEndpoint}/questions`, answer)
  const response1 = await Axios.patch(`${apiEndpoint}/users/a`, answer)
  console.log('updating question answer... ', response)
  console.log('updating user answer... ', response1)
}

// https://gomakethings.com/how-to-check-if-something-is-an-object-with-vanilla-javascript/
 const isPlainObject = function (obj) {
   return Object.prototype.toString.call(obj) === '[object Object]';
 }
//

function getTheUsers (users) {
  return Object.keys(users).reduce((theusers, id) => {
    const user = users[id]
    theusers[id] = {
      ...user,
      answers: Object.keys(user.answers)
    }
    console.log('Theusers: ', theusers)
    return theusers

  }, {})
}

function getTheQuestions(questions) {
  const questionsIds = Object.keys(questions)
  return questionsIds.reduce((thequestions, id) => {
    thequestions[id] = formattedQuestion(questions[id])
    return thequestions
  }, {})
}

function formattedQuestion(question) {
  return Object.keys(question).reduce((formattedQ, key) => {
    const value = question[key]
    if (isPlainObject(value)) {
      formattedQ[key + 'Votes'] = value.votes
      formattedQ[key + 'Text'] = value.text
      return formattedQ
    }
    formattedQ[key] = value
    return formattedQ
  }, {})
}

// export async function getInitialData() {
//   return Promise.all([
//     _getUsers(),
//     _getQuestions()
//   ]).then(([users, questions]) => {
//     console.log('USERS USERS: ', users)
//     console.log('QUESTIONS QUESTIONS: ', questions);
//     return {
//       users: getTheUsers(users),
//       questions: getTheQuestions(questions)
//     }
//   })
// }

// async function _getUsers() {
//   console.log('Fetching users...')
//   const response = await Axios.get(`${apiEndpoint}/users`)
//   console.log('Users RESPONSE.DATA:', response.data)
//   return response.data
// }
//
// async function _getQuestions() {
//   console.log('Fetching questions...')
//   const response = await Axios.get(`${apiEndpoint}/questions`)
//   console.log('Questions RESPONSE.DATA:', response.data)
//   return response.data
// }

export async function getInitialData() {
  const theusers = await Axios.get(`${apiEndpoint}/users`)
  const users = theusers.data
  const theqs = await Axios.get(`${apiEndpoint}/questions`)
  const questions = theqs.data
  console.log('USERS USERS: ', users)
  console.log('QUESTIONS QUESTIONS: ', questions);
  return {
    users: getTheUsers(users),
    questions: getTheQuestions(questions)
  }
}

/*

So now it's not just getting Initial Data ( getInitialData )
but also populating it with some seed data.
the question is, how do you poppulate it with seed data?
so we begin with a blank slate.
then we add onto it.
first we have to implement a signup and login, which creates the user and adds the user to the thing.



TDL:
1) Add the {User} to the USERS_TABLE

we need a way to log in, and a way to sign up.
a way to login
or  just a way to
verizon.net
aol.com
aim.com

2) grab the avatar url












export function _saveQuestionAnswer ({ authedUser, id, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [id]: answer
          }
        }
      }

      questions = {
        ...questions,
        [id]: {
          ...questions[id],
          [answer]: {
            ...questions[id][answer],
            votes: questions[id][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}















 */
