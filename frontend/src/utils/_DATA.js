/* data provided by Tyler McGinnis and Udacity's richardkalehoff */

let users = {
  saraheds: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: 'https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gender-female2-512.png',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    avatarURL: 'https://avatars0.githubusercontent.com/u/2933430',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  johndoe: {
    id: 'johndoe',
    name: 'John Doe',
    avatarURL: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo'],
      text: 'have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'johndoe',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'become a superhero',
    },
    optionTwo: {
      votes: ['johndoe', 'sarahedo'],
      text: 'become a supervillian'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'sarahedo',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be telekinetic',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'be telepathic'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'tylermcginnis',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be a front-end developer',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'be a back-end developer'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'tylermcginnis',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['tylermcginnis'],
      text: 'find $50 yourself',
    },
    optionTwo: {
      votes: ['johndoe'],
      text: 'have your best friend find $500'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'johndoe',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['johndoe'],
      text: 'write JavaScript',
    },
    optionTwo: {
      votes: ['tylermcginnis'],
      text: 'write Swift'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
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

/*
 * export function _saveUser (user) {
 *   make this function here.
 *   return {
 *     id: username,
 *     name: name,
 *     avatarURL: ,
 *     answers: {},
 *     questions: []
 *   }
 * }
 */

export function _addUser(user) {
  return new Promise((res, rej) => {

    setTimeout(() => {
      users = {
        ...users,
        [user.id]: user
      }

      console.log('THE USERS USERS: ', users)
      res(user)
    }, 1000)
  })
}

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question)

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

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


/* We're trying to retrieve the data in the format best suited to work with our UI code.
 * _DATA.js gives the answers in a plain object; this function sets the answers' format
 * to array, not object.
 * With each iteration, it returns the user object with the answeres in
 * the new format.
 */

 // https://gomakethings.com/how-to-check-if-something-is-an-object-with-vanilla-javascript/
  const isPlainObject = function (obj) {
  	return Object.prototype.toString.call(obj) === '[object Object]';
  }
//

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

export function saveQuestion (q) {
  return _saveQuestion(q).then((n) => formattedQuestion(n))
}

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

 // gets initial data in a plain object format
 export function getInitialData() {
   return Promise.all([
     _getUsers(),
     _getQuestions()
   ]).then(([users, questions]) => {
     return {
       users: getTheUsers(users),
       questions: getTheQuestions(questions)
     }})
 }

export function saveQuestionAnswer (params) {
  return _saveQuestionAnswer(params)
}

export function addUser(params) {
  return _addUser(params)
}
