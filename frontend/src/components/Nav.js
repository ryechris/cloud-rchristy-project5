import React from 'react'
import { NavLink } from 'react-router-dom'

class Nav extends React.Component {
  render() {
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              Post a Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/images' activeClassName='active'>
              BETA: upload an image
            </NavLink>
          </li>
          { (this.props.user)
              ? <li className='loggedinuser'>You are logged in as: {this.props.user}</li>
              : <li>You are not currently logged in as any user.</li>}
        </ul>
      </nav>
    )
  }
}

export default Nav
