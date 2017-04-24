import React from 'react'
import PropTypes from 'prop-types'
import ChatMessage from './ChatMessages'
import NewChatMessage from './NewChatMessage'

const ChatBox = ({props}) => (
  <div className='pa3 w-50 overflow-y-auto'>
    <ChatMessage message='Maybe you already have additional info?' time='14:05 pm' />
    <ChatMessage message='It is to early to provide some kind of estimation here. We need user stories.' time='14:05 pm' />
    <ChatMessage message='We are just writing up the user stories now so will have requirements for you next week.' time='14:05 pm' you />
    <ChatMessage time='14:05 pm' you download />
    <NewChatMessage />
  </div>
)

ChatBox.propTypes = {}
ChatBox.defaultProps = {}

export default ChatBox
