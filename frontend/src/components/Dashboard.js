import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function mapStateToProps({ authedUser, users, questions }) {
  console.log('USERS ', authedUser, questions, users)
  let answers;
  authedUser ? answers = users[authedUser].answers : answers = []
  console.log('THE UNDEFINED USERS: ', users)
  console.log('THE UNDEFINED ARRAAY: ', answers)
  const answeredQs = answers.map((id) => questions[id])
    .sort((a,b) => b.timestamp - a.timestamp)
  const unansweredQs = Object.keys(questions)
    .filter((id) => !answers.includes(id))
    .map((id) => questions[id])
    .sort((a,b) => b.timestamp - a.timestamp)
  console.log('ANSWERED QS: ', answeredQs)
  console.log('UNANSWERED QS: ', unansweredQs)
  return {
    answeredQs,
    unansweredQs
  }
}

class Dashboard extends React.Component {
  state = {
    showAnswered: false
  }
  showAnswered = () => {
    this.setState(() => ({
      showAnswered: true
    }))
  }
  showUnanswered = () => {
    this.setState(() => ({
      showAnswered: false
    }))
  }

  render() {
    const { showAnswered } = this.state
    const { answeredQs, unansweredQs } = this.props

    const list = showAnswered === true ? answeredQs : unansweredQs
    console.log('SHOWANSWRED? ', showAnswered)
    console.log('SHOWANSWERED FUNCTION: ', this.showAnswered)
    console.log('SHOWUNANSWERED FUNCTION: ', this.showUnanswered)
    console.log('THE LIST, THE LIST: ', list)

    return (
      <div className='dashboard'>
        <div className='dashboard-category'>
          <button
            style={{color: showAnswered === false ? 'green' : 'inherit'}}
            onClick={this.showUnanswered}
          >Unanswered</button>
          <span>    </span>
          <button
            style={{color: showAnswered === true ? 'green' : 'inherit'}}
            onClick={this.showAnswered}
          >Answered</button>
        </div>
        <ul className='dashboard-ul'>
          {list.map((q) => (
            <li key={q.id}>
              <Link to={`questions/${q.id}`}>{q.id}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}



export default connect(mapStateToProps)(Dashboard)
