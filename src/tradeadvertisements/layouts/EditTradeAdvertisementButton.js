import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class EditTradeAdvertisementButton extends Component {
  render() {
    return(
        <button onClick={()=>browserHistory.push('/edittradeadvertisement/' +this.props.tradeType+'/'+this.props.tradeAdvertisementId)}>Edit</button>

    );
  }
}

export default EditTradeAdvertisementButton;
