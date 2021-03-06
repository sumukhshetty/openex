import React from 'react'
import PropTypes from 'prop-types'
import Other from '../../images/svgReactComponents/other.js'
import You from '../../images/svgReactComponents/you.js'
import Arbiter from '../../images/svgReactComponents/Arbiter.js'
import defaultPdfImage from '../../images/pdf.png'
const moment = require('moment')

const ChatMessage = props =>
  <div className="flex col mv1">
    <div className={`flex cxc ${props.you ? null : `reverse`}`}>
      {props.arbiter ? <Arbiter /> : props.you ? <You /> : <Other />}
      {props.download
        ? <div
          className={`pa2 br2 flex ${props.you
              ? `bg-light-gray`
              : `bg-blue white`}`}
          >
          <img
            src={
                props.fileType === 'application/pdf'
                  ? defaultPdfImage
                  : props.message
              }
              alt="Download Preview"
              className="mh2"
              height="100px"
              width="auto"
            />
            <div className="flex col mxe pb1 ma0">
              <a href={props.message} className="fsmall pointer blue" download>
                Download
              </a>
            </div>
          </div>
        : <div
            className={`pa2 br2 ${props.arbiter
              ? `bg-danger white`
              : props.you ? `bg-light-gray` : `bg-blue white`}`}
          >
            {props.message}
          </div>}
    </div>

    <time className={`ph4 mt1 ftiny ${props.you ? `cs` : `ce`}`}>
      {moment(props.time).format('MMMM Do YYYY, h:mm:ss a')}
    </time>
  </div>

ChatMessage.propTypes = {
  time: PropTypes.number.isRequired
}

ChatMessage.defaultProps = {
  time: 'now'
}

export default ChatMessage
