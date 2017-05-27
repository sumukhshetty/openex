import React, { Component } from 'react'
//import ActiveTradeContainer from './../ui/ActiveTradeContainer'
import EditTradeAdvertisementButton from './EditTradeAdvertisementButton'

class TradeAdvertisement extends Component {
  render() {
    return(
      <tbody>
        <tr>
          <td>60</td>
          <td>Live</td>
          <td>Online Sell</td>
          <td>India</td>
          <td>IMPS</td>
          <td>2000</td>
          <td>0 - 39090.47</td>
          <EditTradeAdvertisementButton/>
        </tr>
      </tbody>
    )
  }
}

export default TradeAdvertisement
