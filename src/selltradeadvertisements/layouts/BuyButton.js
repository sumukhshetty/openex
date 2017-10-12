import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class BuyButton extends Component {
  render() {
    return (
      <td className="fb5">
        <button
          data-test={`buyTrade${this.props.sellTradeAdvertisementId}`}
          onClick={() =>
            browserHistory.push(
              'selltradeadvertisement/' + this.props.sellTradeAdvertisementId
            )}
        >
          {' '}
          Buy{' '}
        </button>
      </td>
    )
  }
}

export default BuyButton
