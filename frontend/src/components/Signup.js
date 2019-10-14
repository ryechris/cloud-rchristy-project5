import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddUser } from '../actions/authedUser'
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js";
// import Axios from 'axios'
// import { apiEndpoint } from '../utils/config'
// const AWS = require('aws-sdk')
// add the var for the apiEndpoint later
/*
{
id: '',
name: '',
avatarURL: '',
answers: {},
questions: []

}

Verify Component


confirm = function() {
  const cognitoUser = new CognitoUser({
   Username: username,
   Pool: userPool
  })

  cognitoUser.confirmRegistration($('#code').val(), true, function (err, results) {
    if (err) {
        alert(err);
    } else {
        window.location = '/';
    }
  });
}

resend = function() {
  const cognitoUser = CognitoUser({
    Username: username,
    Pool: userPool
  })

  cognitoUser.resendConfirmationCode(function (err) {
    if (err) {
        alert(err);
    }
  })
}

<hr></hr>


<form>
    <label htmlFor="code">Code:</label>
    <input
      id="code"
      type="text"
    />
    <button onclick=>Confirm</button>
    <button onclick=>Resend</button>
</form>


 */

class Signup extends Component {
  state = {
    authedUser: '',
    username: '',
    email: '',
    password: '',
    bln: false,
    confirmationcode: ''
  }

  signup = (e) => {
    e.preventDefault()
    const { username, password, email } = this.state
    const poolData = {
      UserPoolId: 'us-east-2_FOuYgqGmd',
      ClientId: '157ar17p5ge6gdb782kpflslif'
    }
    const userPool = new CognitoUserPool(poolData)
    const dataEmail = {
      Name: 'email',
      value: email
    }
    var attributeEmail = new CognitoUserAttribute(dataEmail)
    userPool.signUp(username, password, [attributeEmail], null, function (err, result) {
        if (err) {
            alert(err);
        }
    })
    // this.setState(() => ({
    //   bln: true
    // }))
    this.props.history.push('/')
    this.props.dispatch(handleAddUser({
      id: this.state.username,
      name: this.state.username,
      avatarURL: this.state.avatarURL
    }))
  }

  handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'password' && value.includes('qwerty')) {
      alert('No qwerty in password please.')
    }
    this.setState(() => ({
      [name]: value
    }))
  }

  handleConfirm = (e) => {
    e.preventDefault();
    const { username, confirmationcode } = this.state
    const poolData = {
      UserPoolId: 'us-east-2_FOuYgqGmd',
      ClientId: '157ar17p5ge6gdb782kpflslif'
    }
    const userPool = new CognitoUserPool(poolData)
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool
    })
    cognitoUser.confirmRegistration(confirmationcode, true, function (err, results) {
      if (err) {
          alert(err);
      } else {
        this.props.history.push('/')
        this.props.dispatch(handleAddUser({
          id: this.state.username,
          name: this.state.username,
        }))
          // window.location = '/';
      }
    });
  }

  handleResend = (e) => {
    e.preventDefault();
    const { username } = this.state
    const poolData = {
      UserPoolId: 'us-east-2_FOuYgqGmd',
      ClientId: '157ar17p5ge6gdb782kpflslif'
    }
    const userPool = new CognitoUserPool(poolData)
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool
    })
    cognitoUser.resendConfirmationCode(function (err) {
      if (err) {
          alert(err);
      }
    })
  }

  render() {
    const { username, email, password, bln, confirmationcode } = this.state
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
        <form>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={this.handleInputChange}
          />
          <hr></hr>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={this.handleInputChange}
          />
          <hr></hr>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleInputChange}
          />
          <button onClick={this.signup}>Sign Up</button>
        </form>
        { bln === true
            ? <form>
                <label htmlFor="code">Code:</label>
                <input
                  id='code'
                  name='code'
                  type='text'
                  value={confirmationcode}
                  onChange={this.handleInputChange}
                />
                <button onclick={this.handleConfirm}>Confirm</button>
                <button onclick={this.handleResend}>Resend</button>
              </form>
            : ''
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Signup)
