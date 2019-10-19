import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  render() {
    const { authedUser } = this.props
    // https://reactraining.com/react-router/web/example/auth-workflow
    // https://tylermcginnis.com/react-router-protected-routes-authentication/
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (authedUser) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div>
        <p>Please log in: </p>
        <button onClick={this.props.auther.login}>Log In</button>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, auther}) {
  return {
    authedUser,
    users,
    auther
  }
}

export default connect(mapStateToProps)(Login)

/*

  <label htmlFor='user-select'>Please select a user and log in.</label>
  <select id='user-select' onChange={this.handleInputChange}>
    <option value=''>--select a user--</option>
    {Object.keys(this.props.users).map((id) => {
      const nm = this.props.users[id].name.split(' ')
      return (
        <option key={id} value={id}>{nm[0]} {nm[1]}</option>
      )
    })}
  </select>

 */
