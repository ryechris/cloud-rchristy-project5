import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { useAuth0 } from "../react-auth0-wrapper";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

class Login extends Component {
  state = {
    authedUser: '',
    username: '',
    password: ''
  }
  // handleInputChange = (e) => {
  //   const { value } = e.target
  //   this.setState(() => ({
  //     authedUser: value
  //   }))
  // }

  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState(() => ({
      [name]: value
    }))
  }

  login = (e) => {
    e.preventDefault();
    console.log('ENTERING LOGIN')
    const disp = this.props.dispatch;
    const { username, password } = this.state;
    const poolData = {
      UserPoolId: 'us-east-2_FOuYgqGmd',
      ClientId: '157ar17p5ge6gdb782kpflslif'
    };
    const userPool = new CognitoUserPool(poolData);
    const authenticationData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: this.state.username,
      Pool: userPool
    };
    const cognitoUser = new  CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function () {
        console.log('III. LOOK HERE AGAIN: ', username)
        disp(setAuthedUser(username))
      },
      onFailure: function (err) {
          console.log('IIIA. THE ERROR LOOKIE HERE: ', err)
          alert(err);
      }
    });

    this.props.history.push('/')
  }

  render() {
    // const { username, password } = this.state
    const { authedUser } = this.props
    const { loginWithRedirect } = useAuth0();
    // add state to this component
    // handle input change
    // signup link is to take them ot the signup page pleaase
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
        <button
          onClick={() =>
            loginWithRedirect({})
          }
        >
          Log in
        </button>
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

export default connect(mapStateToProps)(Login)

/*


class Nav extends React.Component {
  render() {

    if (!isAuthenticated) {
      return (

      )
    }

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
      <label htmlFor="password">Password: </label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={this.handleInputChange}
      />>
      <button onClick={this.login}>Login</button>
    </form>







 */
