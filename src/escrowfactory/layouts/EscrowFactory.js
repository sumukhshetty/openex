import React, { Component } from 'react'
import EscrowContractFormContainer from '../ui/escrowfactoryform/EscrowFactoryFormContainer'

class EscrowFactory extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>EscrowFactory</h1>
            <p>Create and deploy the escrow contract here.</p>
            <EscrowContractFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default EscrowFactory
