import React, { Component } from 'react'

class EscrowFactoryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      factoryInputs: {},
    }
  }

  onInputChange(event) {
    var _factoryInputs = this.state.factoryInputs
    if(event.target.id === "buyerAddress"){
      _factoryInputs['buyerAddress'] = event.target.value
      //this.setState({ factoryInputs: _factoryInputs })
    } else if (event.target.id === "sellerAddress") {
      _factoryInputs['sellerAddress'] = event.target.value
    } else if (event.target.id === "etherAmount") {
      _factoryInputs['etherAmount'] = event.target.value
    }
    this.setState({ factoryInputs: _factoryInputs })
    //this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.factoryInputs.buyerAddress.length)

    //TODO: validate form properly
    if(!this.state.web3.web3.isAddress(this.state.factoryInputs.buyerAddress)) {
      return alert("please fill in a valid address")
    }

    if(!this.state.web3.web3.isAddress(this.state.factoryInputs.sellerAddress)) {
      return alert("please fill in a valid address")
    }
    // TODO put a limit
    // TODO check that its a positive integer


    this.props.onEscrowFactoryFormSubmit(
      this.state.web3.web3,
      this.state.factoryInputs
    )
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="buyerAddress">Buyer Address</label>
          <input id="buyerAddress" type="text" value={this.state.factoryInputs.buyerAddress} onChange={this.onInputChange.bind(this)} placeholder="buyer Address" />
          <span className="pure-form-message">This is a required field.</span>
          <br />
          <label htmlFor="sellerAddress">Seller Address</label>
          <input id="sellerAddress" type="text" value={this.state.factoryInputs.sellerAddress} onChange={this.onInputChange.bind(this)} placeholder="seller Address" />
          <span className="pure-form-message">This is a required field.</span>
          <br />
          <label htmlFor="etherAmount">Ether Amount</label>
          <input id="etherAmount" type="text" value={this.state.factoryInputs.etherAmount} onChange={this.onInputChange.bind(this)} placeholder="amount in ether" />
          <span className="pure-form-message">This is a required field.</span>
          <br />
          <button type="submit" className="pure-button pure-button-primary">Create Escrow Contract</button>
        </fieldset>
      </form>
    )
  }
}

export default EscrowFactoryForm
