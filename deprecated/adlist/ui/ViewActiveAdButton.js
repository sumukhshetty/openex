import React, { Component } from 'react';
import { browserHistory } from 'react-router';

// TODO import HelpContainer

class ViewActiveAdButton extends Component {
  // TODO @qjflores get trade data from firebase

  render() {
    // ISSUE-231-23: this url needs to be implemented more appropriately like edit/tradeadvertisement/purchaseRequestId
    // and edit/tradeadvertisement/purchaseRequestId
    var orderType = (this.props.tradeType === "buy-ether") ? 'activebuyorder' : 'sellorderdetail';
    return(
      <td className='fb10 tc'>
    {/*ISSUE-231-22 orderId should change to tradeAdvertisementId*/}

        <button onClick={()=>browserHistory.push(orderType + '/' +this.props.orderId)}>Edit</button>

      </td>
    );
  }
}

export default ViewActiveAdButton;
