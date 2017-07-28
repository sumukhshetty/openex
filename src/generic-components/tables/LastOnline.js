import React from 'react'

const moment = require('moment')

const LastOnline = props => {
  var time
  try {
    if (props.time === 'Active') {
      time === 'a few seconds ago'
    } else {
      time = moment(props.time).fromNow()
    }
  } catch (error) {
    time = '-'
  }

  console.log(
    'days',
    props.time,
    moment(props.time).diff(moment(Date.now()), 'minutes')
  )
  let dot
  if (moment(props.time).diff(moment(Date.now()), 'minutes') >= -15) {
    dot = 'greenDot'
  } else if (moment(props.time).diff(moment(Date.now()), 'minutes') >= -120) {
    dot = 'yellowDot'
  } else if (moment(props.time).diff(moment(Date.now()), 'minutes') >= -1440) {
    dot = 'orangeDot'
  } else {
    dot = 'redDot'
  }

  return (
    <td className="fb15 flex cxc mxc">
      <span className={`${dot} mr1`} />
      <span>
        {time === 'a few seconds ago' ? 'Active' : time}
      </span>
    </td>
  )
}

export default LastOnline
