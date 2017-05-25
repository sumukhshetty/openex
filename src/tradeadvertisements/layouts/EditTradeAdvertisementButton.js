import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class EditTradeAdvertisementButton extends Component {
  render() {
    return(
      <td className='fb10 tc'>
        <button onClick={()=>browserHistory.push('/edittradeadvertisement/' +this.props.tradeAdvertisementId)}>Edit</button>

      </td>
    );
  }
}

export default EditTradeAdvertisementButton;
