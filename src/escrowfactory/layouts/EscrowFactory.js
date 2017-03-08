import React, { Component } from 'react'
import EscrowFactoryFormContainer from '../ui/escrowfactoryform/EscrowFactoryFormContainer'

class EscrowFactory extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>EscrowFactory</h1>
            <p>Create and deploy the escrow contract here.</p>
            <EscrowFactoryFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default EscrowFactory
