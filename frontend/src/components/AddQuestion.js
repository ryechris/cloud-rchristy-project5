import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class AddQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  }

  // When input changes, call this function to set the State
  // that resides in the Component.
  handleInputChange = (evt) => {
    const { name, value } = evt.target
    this.setState(() => ({
      [name]: value
    }))
    console.log(this.state)
  }

  // function that determines whether the submit button is enabled
  isDisabled = () => {
    const { optionOne, optionTwo } = this.state
    return optionOne === '' || optionTwo === ''
  }

  // function that handles form submission
  handleSubmit = (evt) => {
    evt.preventDefault()

    // redirect the user to the home page upon submitting the form
    this.props.history.push('/')

    this.props.dispatch(handleAddQuestion({
      optionOneText: this.state.optionOne,
      optionTwoText: this.state.optionTwo,
      author: this.props.authedUser
    }))
  }

  render() {
    const { optionOne, optionTwo } = this.state

    return (
      <form className='form' onSubmit={this.handleSubmit}>
        <h2>Would You Rather</h2>
        <h3>What are your Options?</h3>
        <label className='label' htmlFor='optionOne'>-A-</label>
        <input
         id='optionOne'
         name='optionOne'
         value={optionOne}
         onChange={this.handleInputChange}
         className='option'
         type='text'
        />
        <label htmlFor='optionOne'>-B-</label>
        <input
         id='optionTwo'
         name='optionTwo'
         value={optionTwo}
         onChange={this.handleInputChange}
         className='option'
         type='text'
        />
        <button
        className='button'
        type='submit'
        disabled={this.isDisabled()}>Submit</button>
      </form>
    )
  }
}

function mapStateToProps ({ authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(AddQuestion)
