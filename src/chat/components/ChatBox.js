import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ChatMessage from './ChatMessages'
import NewChatMessage from '../containers/newMessage'
import Loading from './Loading'
import map from 'lodash/map'

export default class ChatBox extends Component {

  componentDidMount () {
    this.props.getUser()
  }

  render () {
    return (
      <div className='pa3 w-50 overflow-y-auto'>
        <ChatMessage message='Maybe you already have additional info?' time='14:05 pm' />
        <ChatMessage message='It is too early to provide some kind of estimation here. We need user stories.' time='14:05 pm' />
        <ChatMessage message='We are just writing up the user stories now so will have requirements for you next week.' time='14:05 pm' you />
        <ChatMessage time='14:05 pm' you download />

        {map(this.props.chatMessages, (message, index) => (
          <ChatMessage
            key={index}
            message={message.content} time={message.timeStamp}
            you
            />
          ))
        }

        {this.props.chatAuth.status === 'ANONYMOUS' && <Loading />}
        {this.props.chatAuth.status === 'SIGNED_IN' && <NewChatMessage email={this.props.chatAuth.email} />}
      </div>
    )
  }}

ChatBox.propTypes = {
  chatAuth: PropTypes.object.isRequired
}
