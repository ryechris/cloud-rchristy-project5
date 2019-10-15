import React, {Component} from 'react';
import Auth from '../reducers/auth';

export default class Callback extends Component {
  componentDidMount() {
    // try this.props
    const auth = new Auth();
    auth.handleAuthentication();
  }

  render() {
    return (
      <div>Loading...</div>
    )
  }
}
