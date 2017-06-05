import React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'

//const moment = require('moment')

const ProcessKycRow = (props) => {
  return (
    <tbody className='flex'>
      <tr className='flex cxc' key={props.index}>
      <td className='fb10 tc'>{props.userUid}</td>
      <td className='fb10 tc'>{props.country}</td>
      <td className='fb10 tc'>Process KYC</td>
      <td className='me'>
        <button onClick={() => browserHistory.push('/processkyc/' + props.country + '/' + props.userUid)}>
        View / Message</button>
      </td>
    </tr>
    </tbody>
  )
}


export default ProcessKycRow
