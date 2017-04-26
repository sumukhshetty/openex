import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ChatMessage from './ChatMessages'
import NewChatMessage from '../containers/newMessage'
import Loading from './Loading'

export default class ChatBox extends Component {

  componentDidMount () {
    this.props.getUser(this.props.tradeId, this.props.buyerId, this.props.sellerId)
    // maybe this need to be getChat if teh user is already available (liek between pages on the same chatAuth)

    this.props.startListeningForMessages(this.props.tradeId)
  }

  componentWillUnmount () {
    this.props.clearMessagesFromState()
  }

  render () {
    const messages = this.props.chatMessages
    const you = this.props.chatAuth.uid
    return (
      <div className='pa3 w-50 overflow-y-auto'>
        {Object.keys(messages)
          .map((message, index) =>
          (
            <ChatMessage
              key={index}
              message={messages[message].content}
              time={messages[message].timeStamp}
              you={messages[message].uid === you}
            />
          )
        )
        }
        {this.props.chatAuth.status === 'ANONYMOUS' && <Loading />}
        {this.props.chatAuth.status === 'SIGNED_IN' && <NewChatMessage
          tradeId={this.props.tradeId} />}
      </div>
    )
  }}

ChatBox.propTypes = {
  chatAuth: PropTypes.object.isRequired
}
