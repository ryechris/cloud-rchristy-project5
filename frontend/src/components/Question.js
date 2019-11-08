import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/answers'

const voteKeys = ['optionOneVotes', 'optionTwoVotes']

const getPercentage = (count, total) => {
  return total === 0 ? '-' : parseInt(count/total * 100, 10)
}

class Question extends Component {
  handleAnswer = (answer) => {
    const { question, authedUser, dataTBS } = this.props
    this.answered = true
    console.log('TBS  PRE: ', dataTBS)
    const tbs = {
      ...dataTBS,
      [question.id]: answer
    }
    const ans = {
      ar: {
        authedUser,
        answer,
        id: question.id
      },
      tbs
    }
    console.log('', tbs)
    this.props.dispatch(handleAddAnswer(ans))
  }

  render() {
    if (this.props.question === null) {
      return <p>404: Question does not exist.</p>
    }
    const { question, vote, authorAvatar } = this.props;
    const totalVotes = voteKeys
      .reduce((total, key) => total + question[key].length, 0);

    return (
      <div className='poll-container'>
        <h1 className='wyr'>Would You Rather</h1>

        <div className='poll-author'>
          By <img src={authorAvatar} alt="Author's avatar" />
        </div>

        <ul>
          {['optionOneText', 'optionTwoText'].map((key) => {
            const count = question[key.slice(0,9) + 'Votes'].length
            return (
              <li
                key={key}
                onClick={() => {
                  if (vote === null && !this.answered) {
                    this.handleAnswer(key.slice(0,9))
                  }
                }}
                className={`option ${vote === key.slice(0,9) ? 'selected' : ''}`}
              >{vote === null
                  ? question[key]
                  : <div className='result'>
                      <span>{question[key]}</span>
                      <span>{getPercentage(count, totalVotes)}% ({count})</span>
                    </div>}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users, dataTBS }, { match }) {
  const { id } = match.params
  // next we grab the question with that id like so:
  const question = questions[id]

  if (!question) {
    return {
      question: null
    }
  }

  const vote = voteKeys.reduce((vote, key) => {
    if (vote !== null) {
      return vote.slice(0,9)
    }
    return question[key].includes(authedUser) ? key : vote
  }, null)

  return {
    question,
    vote,
    authedUser,
    dataTBS,
    authorAvatar: users[question.author].avatarURL
  }
}

export default connect(mapStateToProps)(Question)
