import React, { Component } from 'react'
import tick from '../images/tick.svg'

class WalletComponent extends Component {
  render() {
    return(
      <div>
        <div className="ethereum-wallet-id gradient">
          {/* Following gets replaced by actual wallet address for authenticated users */}
          {this.props.web3.eth.accounts[0]}
        </div>
        <div className="check-mark"><img src={tick} alt="" /></div>
      </div>
    )
  }
}

export default WalletComponent
