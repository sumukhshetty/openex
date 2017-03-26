import React, { Component } from 'react'
import tick from '../images/tick.svg'

class WalletComponent extends Component {
  render() {
    return(
      <div>
        <div className="ethereum-wallet-id gradient">
          {/* Following gets replaced by actual wallet address for authenticated users */}
          0x98d87e87d7e78ed78b787a87b8aaaD878e
        </div>
        <div className="check-mark"><img src={tick} alt="" /></div>
      </div>
    )
  }
}

export default WalletComponent
