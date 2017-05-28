import React, {Component} from 'react'

export default class Subscribe extends Component {

  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // ISSUE-199: add the users email to a mailing list using firebase functions and mailgun-js
  handleSubmit (e) {
    e.preventDefault()
    console.log(this.state.email)
  }

  render () {
    return (
      <form
        className='w-100 bg-blue pa4 flex col cxc white'
        onSubmit={this.handleSubmit}>
        <h2 className='tc w-100'>Get In Touch</h2>
        <p>We are here for queries big or small.</p>
        <p>Feel free to get in touch with us.</p>
        <input
          type='text'
          placeholder='Write email address...' className='w-75 br2 mv3 pa3 coal'
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })} />
        <div>
          <input type='submit' value='subscribe' />
        </div>
      </form>)
  }
}
