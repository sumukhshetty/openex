import React, { Component } from 'react'
import ActiveBuyOrderContainer from './../ui/ActiveBuyOrderContainer'

class ActiveBuyOrder extends Component {
  render() {

    const progress_map = [
      { status: 'completed', label: '', text: 'Escrow' },
      { status: 'active', label: '', text: 'Payment' },
      { status: '', label: '', text: 'Ether Released' }
    ]
    const step = "payment";
    // NOTE / TODO: above variables hold mock data

    return(
      <section className="activeTrade">
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1">
              <ActiveBuyOrderContainer  params={this.props.params}/>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ActiveBuyOrder
