import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { apiEndpoint } from '../utils/config'

class Images extends React.Component {
  state = {
    file: undefined,
    images:  []
  }

  handleInputChange = (evt) => {
    const files = evt.target.files
    if (!files) return
    this.setState(() => ({
      file: files[0]
    }))
  }

  handleSubmit = async (evt) => {
    evt.preventDefault()
    const objres = await Axios.post(`${apiEndpoint}/images`, {user: this.props.authedUser})
    console.log('OBJRES LOOK : ',  objres)
    await fetch(objres.data.uploadUrl, {
      method: 'PUT',
      body: this.state.file
    })
    this.setState(() => ({
      images: this.state.images.concat([objres.data.bUrl])
    }))
    console.log('THIS COMPONENTS STATE IMAGES: ', this.state)
    this.props.history.push('/images')
  }

  getImages = async () => {
    console.log('THIS.PROPS.AUTHEDUSER', this.props.authedUser)
    await Axios.get(`${apiEndpoint}/images/${this.props.authedUser}`).then((result) => {
      console.log('HEY HEY RESULT: ', result)
      this.setState(() => ({
        images: result.data
      }))
    })
    // result.Data
  }

  componentDidMount() {
    this.getImages();
  }

  render() {
    return (
      <div>
        <form className='form' onSubmit={this.handleSubmit}>
          <label className='label' htmlFor='imagefile'>Upload your image:</label>
          <input
            id='imagefile'
            name='imagefile'
            acccept="image/*"
            onChange={this.handleInputChange}
            className='fileupload'
            type='file'
          />
          <button
            type="submit"
          >Upload
          </button>
        </form>
        {this.state.images.length > 0 && this.renderList()}
      </div>
    )
  }

  renderList() {
    return (
      <ul>
        {this.state.images.map((id) => (
          <div key={id} className='card'>
            <img className='card-img' src={id.url}/>
          </div>
        ))}
      </ul>
    )
  }
}

function mapStateToProps ({ authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Images)
