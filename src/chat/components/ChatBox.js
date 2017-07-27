import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChatMessage from './ChatMessages'
import NewChatMessage from '../containers/newMessage'
import Loading from './Loading'

export default class ChatBox extends Component {
  componentDidMount() {
    this.props.getUser(
      this.props.tradeId,
      this.props.buyerId,
      this.props.sellerId
    )
    this.props.startListeningForMessages(this.props.tradeId)
  }

  componentWillUnmount() {
    this.props.clearMessagesFromState()
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom()
  }

  scrollToBottom() {
    const { thing } = this.refs
    thing.scrollTop = thing.scrollHeight - thing.clientHeight
  }

  render() {
    const messages = this.props.chatMessages
    const you = this.props.chatAuth.uid

    return (
      <div
        className="pa3 w-50 bg-white overflow-y-auto"
        style={{ height: '350px', minHeight: '50px' }}
        ref={`thing`}
      >
        {Object.keys(messages).map((message, index) =>
          <ChatMessage
            key={index}
            message={messages[message].content}
            time={messages[message].timeStamp}
            you={messages[message].uid === you}
            arbiter={
              messages[message].uid !== this.props.sellerId &&
              messages[message].uid !== this.props.buyerId
            }
            download={messages[message].download}
            fileType={messages[message].fileType}
          />
        )}
        {this.props.chatAuth.status === 'ANONYMOUS' && <Loading />}
        {this.props.chatAuth.status === 'SIGNED_IN' &&
          <NewChatMessage
            tradeId={this.props.tradeId}
            purchaseRequest={this.props.purchaseRequest}
          />}
      </div>
    )
  }
}

ChatBox.propTypes = {
  chatAuth: PropTypes.object.isRequired
}
