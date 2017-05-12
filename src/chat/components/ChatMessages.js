import React from 'react'
import PropTypes from 'prop-types'
import Other from '../../images/svgReactComponents/other.js'
import You from '../../images/svgReactComponents/you.js'
import Arbiter from '../../images/svgReactComponents/Arbiter.js'
import stockPhoto from '../../images/downloadPhoto.png'
const moment = require('moment')

const ChatMessage = (props) => (
  <div className='flex col ma3'>
    <div className={`flex cxc ${props.you ? null : `reverse`}`}>
      {props.arbiter ? <You /> : props.you ? <You /> : <Other />}
      {props.download ?
        <div className={`pa2 br2 flex ${props.you ? `bg-white` : `bg-blue white`}`}>
          <img
            src={props.message}
            alt='Download Preview'
            className='mh2'
            height='100px'
            width='auto' />
          <div className='flex col mxe pb1 ma0'>
            <a href={props.message}
              className='fsmall pointer blue'
              download>
              Download
            </a>
          </div>
        </div> :
        <div className={`pa2 br2 o ${props.arbiter ? `bg-danger white` : props.you ? `bg-white` : `bg-blue white`}`}>
          {props.message}
        </div>}
    </div>
    {console.log(props.arbiter)}
    <time className={`ph4 mt1 ftiny ${props.you ? `cs` : `ce`}`}>

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
