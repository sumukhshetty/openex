import React from 'react'
import * as _ from 'lodash'
import { browserHistory } from 'react-router'

//const moment = require('moment')

const AdminRow = (props) => {
  return (
    <tbody className='flex'>
      <tr className='flex cxc' key={props.index}>
      <td className='fb5 tc'>{props.purchaseRequestId}</td>
      <td className='fb20 tc'>{new Date(props.time).toDateString()}</td>
      <td className='fb10 tc'>{props.purchaserequest.sellerUsername}</td>
      <td className='fb15 tc'>{props.purchaserequest.buyerUsername}</td>
      <td className='fb10 tc'>{props.purchaserequest.etherAmount}</td>
      <td className='fb10 tc'>{props.purchaserequest.fiatAmount}</td>
      <td className='fb10 tc danger'> {props.purchaserequest.status}</td>
      <td className='me'>
        <button onClick={() => browserHistory.push('/activetrade/' + props.purchaseRequestId + '/' + props.countryCode)}>
        View / Message</button>
      </td>
    </tr>
    </tbody>
  )
}


export default AdminRow
