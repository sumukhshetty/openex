import React, { Component } from 'react'
import WhyDidYouCancel from './WhyDidYouCancel'

class CancelTrade extends Component {
  state = {
    showCancelModal: false
  }
  confirmCancel() {
    this.setState({ showCancelModal: true })
    // if (window.confirm('Are you sure you want to cancel this trade?')) {
    //   this.props.cancelTrade()
    // }
  }

  closeModal = () => {
    this.setState({ showCancelModal: false })
  }

  render() {
    return (
      <div className="measure pv4">
        {this.state.showCancelModal && (
          <WhyDidYouCancel
            cancelTrade={this.props.cancelTrade}
            closeModal={this.closeModal}
            tradeId={this.props.tradeId}
          />
        )}
        <p className="tc flarge b">Resolve Trade Issues</p>
        <p>
          Made a mistake with payment or want to try another seller? Never
          cancel if you already paid the seller.
        </p>
        <div className="tc">
          <button className="bg-danger" onClick={this.confirmCancel.bind(this)}>
            Cancel Trade
          </button>
        </div>
      </div>
    )
  }
}

export default CancelTrade
