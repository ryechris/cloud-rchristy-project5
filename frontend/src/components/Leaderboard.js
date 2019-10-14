import React from 'react'
import { connect } from 'react-redux'

function Leaderboard ({users}) {
  return (
    <ul>
      {users.map((user) => (
        <li className='user'>
          <img src={user.avatarURL} alt={`${user.name}'s avatar`} />
          <div>
            <h1>{user.name}</h1>
            <p>Number of Questions posted: {user.questions}</p>
            <p>Number of Questions answered: {user.answers}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

// { users: {} }
function mapStateToProps ({users}) {
  return {
    users: Object.keys(users).map((id) => {
      const { name, avatarURL, questions, answers } = users[id]
      return {
        id,
        name,
        avatarURL,
        questions: questions.length,
        answers: answers.length
      }
    }).sort((a,b) => b.questions + b.answers > a.questions + a.answers)
  }
}

export default connect(mapStateToProps)(Leaderboard)
