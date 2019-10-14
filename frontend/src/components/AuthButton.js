import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class AuthButton extends Component {
  signout = (e) => {
    e.preventDefault()
    // this.props.history.push('/')
    this.props.dispatch(setAuthedUser(''))
    // <Redirect to={{ pathname: '/' }}>
  }
  render() {
    return (
      <button className='btn' onClick={this.signout} >Sign Out</button>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(AuthButton)
