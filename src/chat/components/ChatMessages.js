import React from 'react'
import PropTypes from 'prop-types'
import Other from '../../images/svgReactComponents/other.js'
import You from '../../images/svgReactComponents/you.js'
import stockPhoto from '../../images/downloadPhoto.png'
const moment = require('moment')

const ChatMessage = (props) => (
  <div className='flex col ma3'>
    <div className={`flex cxc ${props.you ? null : `reverse`}`}>
      {props.you ? <You /> : <Other />}
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
    <time className={`ftiny ${props.you ? `cs` : `ce`}`}>
      {moment(props.time).format('MMMM Do YYYY, h:mm:ss a')}
    </time>
  </div>
)

ChatMessage.propTypes = {
  time: PropTypes.number.isRequired
}

ChatMessage.defaultProps = {
  time: 'now'
}

export default ChatMessage
