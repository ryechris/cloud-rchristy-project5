/* data provided by Tyler McGinnis and Udacity's richardkalehoff */

let users = {
  sarahedo: {
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



/*
# Welcome to Serverless!
#
# This file is the main config file for your service.
# It's very minimal at this point and uses default values.
# You can always add more config options for more control.
# We've included some commented out config examples here.
# Just uncomment any of them to get that config option.
#
# For full config options, check the docs:
#    docs.serverless.com
#
# Happy Coding!

# create
# listen
# get
# update
# delete

# tracing:
#   lambda: true
#   apiGateway: true

#   GetTheUsers:
#     handler: getUsers.handler
#     events:
#       - http:
#           method: get
#           path: users
#           cors: true
#           # authorizer: Auth
#
#   GetTheQuestions:
#     handler: getQuestions.handler
#     events:
#        - http:
#            method: get
#            path: questions
#
#   AddAQuestion:
#     handler: addQuestion.handler
#     events:
#       - http:
#           method: post
#           path: questions
#           # authorizer:
#           cors: true
#
#   UpdateAQuestion:
#     handler: updateQuestion.handler
#     events:
#       - http:
#           method: patch
#           path: questions/{questionid}
#           cors: true
#           # authorizer: Auth
#
#   DeleteAQuestion:
#     handler: deleteQuestion.handler
#     events:
#       - http:
#           method: delete
#           path: questions/{questionid}
#           cors: true
#           # authorizer: Auth
#
#
#
# resources:
#   Resources:
#     UsersDBTable:
#       Type: 'AWS::DynamoDB::Table'
#       Properties:
#         AttributeDefinitions:
#           - AttributeName: id
#             AttributeType: S
#         KeySchema:
#           - AttributeName: id
#             KeyType: HASH
#         BillingMode: PAY_PER_REQUEST
#         TableName: ${self:provider.environment.USERS_TABLE}
#
#     QuestionsDBTable:
#       Type: 'AWS::DynamoDB::Table'
#       Properties:
#         AttributeDefinitions:
#           - AttributeName: id
#             AttributeType: S
#         KeySchema:
#           - AttributeName: id
#             KeyType: HASH
#         BillingMode: PAY_PER_REQUEST
#         TableName: ${self:provider.environment.QUESTIONS_TABLE}
#
#     AvatarsS3Bucket:
#       Type: 'AWS::S3::Bucket'
#       Properties:
#         BucketName: ${self:provider.environment.S3_BUCKET}
#         CorsConfiguration:
#           CorsRules:
#             -
#               AllowedOrigins:
#                 - '*'
#               AllowedHeaders:
#                 - '*'
#               AllowedMethods:
#                 - GET
#                 - PUT
#                 - POST
#                 - DELETE
#                 - HEAD
#               MaxAge: 3000
#
#     BucketPolicy:
#       Type: AWS::S3::BucketPolicy
#       Properties:
#         PolicyDocument:
#           Id: sls-wyr-policy
#           Version: "2012-10-17"
#           Statement:
#         Bucket: !Ref AttachmentsBucket

# AWS Cognito stuff
# https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_Cognito.html

# you can overwrite defaults here
#  stage: dev
#  region: us-east-1

# you can add statements to the Lambda function's IAM Role here
#  iamRoleStatements:
#    - Effect: "Allow"
#      Action:
#        - "s3:ListBucket"
#      Resource: { "Fn::Join" : ["", ["arn:aws:s3:::", { "Ref" : "ServerlessDeploymentBucket" } ] ]  }
#    - Effect: "Allow"
#      Action:
#        - "s3:PutObject"
#      Resource:
#        Fn::Join:
#          - ""
#          - - "arn:aws:s3:::"
#            - "Ref" : "ServerlessDeploymentBucket"
#            - "/*"

# you can define service wide environment variables here
#  environment:
#    variable1: value1

# you can add packaging information here
#package:
#  include:
#    - include-me.js
#    - include-me-dir/**
#  exclude:
#    - exclude-me.js
#    - exclude-me-dir/**
#
# functions:
#   hello:
#     handler: handler.hello
#    The following are a few example events you can configure
#    NOTE: Please make sure to change your handler code to work with those events
#    Check the event documentation for details
#    events:
#      - http:
#          path: users/create
#          method: get
#      - websocket: $connect
#      - s3: ${env:BUCKET}
#      - schedule: rate(10 minutes)
#      - sns: greeter-topic
#      - stream: arn:aws:dynamodb:region:XXXXXX:table/foo/stream/1970-01-01T00:00:00.000
#      - alexaSkill: amzn1.ask.skill.xx-xx-xx-xx
#      - alexaSmartHome: amzn1.ask.skill.xx-xx-xx-xx
#      - iot:
#          sql: "SELECT * FROM 'some_topic'"
#      - cloudwatchEvent:
#          event:
#            source:
#              - "aws.ec2"
#            detail-type:
#              - "EC2 Instance State-change Notification"
#            detail:
#              state:
#                - pending
#      - cloudwatchLog: '/aws/lambda/hello'
#      - cognitoUserPool:
#          pool: MyUserPool
#          trigger: PreSignUp
#      - alb:
#          listenerArn: arn:aws:elasticloadbalancing:us-east-1:XXXXXX:listener/app/my-load-balancer/50dc6c495c0c9188/
#          priority: 1
#          conditions:
#            host: example.com
#            path: /hello

#    Define function environment variables here
#    environment:
#      variable2: value2

# you can add CloudFormation resource templates here
#resources:
#  Resources:
#    NewResource:
#      Type: AWS::S3::Bucket
#      Properties:
#        BucketName: my-new-bucket
#  Outputs:
#     NewOutput:
#       Description: "Description for the output"
#       Value: "Some output value"


*/
