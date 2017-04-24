import React, { PropTypes } from 'react'
// import PropTypes from 'prop-types'
import avatar2 from '../../images/avatar2.png'
import avatar1 from '../../images/avatar1.png'
import stockPhoto from '../../images/downloadPhoto.png'

const ChatMessage = (props) => (
  <div className='flex col ma3'>
    <div className={`flex ${props.you ? null : `reverse`}`}>
      <img
        src={props.you ? avatar1 : avatar2}
        alt='avatar'
        className='ma2'
        height='25px' />
      {props.download &&
      <div className={`pa2 br2 flex ${props.you ? `bg-white` : `bg-blue white`}`}>
        <img
          src={stockPhoto}
          alt='download preview'
          className='mh2'
          width='125px' />
        <div className='flex col pa0 ma0'>
          <p>
             BigRoom.png
           </p>
          <p className='fsmall pointer blue'>
             Download
           </p>
        </div>
      </div>}
      {props.message &&
      <div className={`pa2 br2 ${props.you ? `bg-white` : `bg-blue white`}`}>
        {props.message}
      </div>}
    </div>
    <time className={`fsmall ${props.you ? `ce` : `cs`}`}>
      {props.time}
    </time>
  </div>
)

ChatMessage.propTypes = {
  time: PropTypes.string.isRequired
}

ChatMessage.defaultProps = {
  time: 'now'
}

export default ChatMessage
