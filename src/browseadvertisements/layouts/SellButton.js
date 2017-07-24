import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class SellButton extends Component {
  render () {
    return (
      <td className='fb5'>
        <button onClick={()=>browserHistory.push('browsebuyadvertisement/'+this.props.buyTradeAdvertisementId)}> Sell </button>
      </td>
    );
  }
}

export default SellButton;
