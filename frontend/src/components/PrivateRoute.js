import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddUser } from '../actions/authedUser'

class PrivateRoute extends React.Component {
  componentDidMount() {
    console.log('HELLO FROM PVROUTE')
    const user  = this.props.auther.user()
    const { nickname, picture } = user;
    console.log('LOOKIE LOOKIE HERE: ', nickname, picture)
    if (nickname) {
      this.props.dispatch(handleAddUser({ nickname, picture }));
    }
  }
  render() {
    const {component: Component, ...rest} = this.props;

    return (
      <Route {...rest} render={(props) => (
        (this.props.authedUser)
          ? <Component {...props}/>
          : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }}/>
      )}/>
    )
  }
}

function mapStateToProps({ authedUser, auther }) {
  return {
    authedUser,
    auther
  }
}

export default connect(mapStateToProps)(PrivateRoute)
