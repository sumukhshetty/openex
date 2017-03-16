import React, { Component } from 'react'
import { BuyForm } from './BuyForm'
import { SellForm } from './SellForm'

class PostTradeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      postTradeDetails: {
        tradeType: '',
        amount:0,
        //TODO check this
        buyerAddress:'',
        paymentMethod:'',
        bankInformation:'',
        minTransactionLimit:'',
        maxTransactionLimit:'',
        termsOfTrade:''
      },
      buyFormBool: false,
      user: this.props.user
    }
  }

  componentWillMount(){
    var connectedAccount = this.props.web3.web3.eth.accounts[0]
    this.setState({postTradeDetails:{amount:0,buyerAddress:connectedAccount}})
  }

  onInputChange(event) {
    var _postTradeDetails = this.state.postTradeDetails
    if(event.target.id === "location"){
      _postTradeDetails['location'] = event.target.value
      //this.setState({ postTradeDetails: _postTradeDetails })
    } else if (event.target.id === "amount") {
      _postTradeDetails['amount'] = event.target.value
    } else if (event.target.id === "bankInformation") {
      _postTradeDetails['bankInformation'] = event.target.value
    } else if (event.target.id === "minTransactionLimit") {
      _postTradeDetails['minTransactionLimit'] = event.target.value
    } else if (event.target.id === "maxTransactionLimit") {
      _postTradeDetails['maxTransactionLimit'] = event.target.value
    } else if (event.target.id === "termsOfTrade"){
      _postTradeDetails['termsOfTrade'] = event.target.value
    }
    this.setState({ postTradeDetails: _postTradeDetails })
  }

  onTradeTypeChange(event){
    var _postTradeDetails = this.state.postTradeDetails
    var _buyFormBool = this.state.buyFormBool
    _postTradeDetails['tradeType'] = event.target.value
    if ( _postTradeDetails['tradeType'] === 'sell-ether'){
      _postTradeDetails = Object.assign({}, 
        this.state.postTradeDetails, {tradeType:event.target.value}
      )
      _buyFormBool = false
  } else {
    _postTradeDetails = Object.assign({}, 
      this.state.postTradeDetails, {tradeType:event.target.value}
    )
    _buyFormBool = true
  }

    this.setState({ postTradeDetails: _postTradeDetails,buyFormBool:_buyFormBool })
  }

  onPaymentMethodChange(event){
    var _postTradeDetails = Object.assign({}, 
      this.state.postTradeDetails, 
      {paymentMethod:event.target.value}
      )
    this.setState({postTradeDetails: _postTradeDetails})
  }

  onCurrencyChange(event){
   var _postTradeDetails = Object.assign({}, 
      this.state.postTradeDetails, 
      {currency:event.target.value}
      )
    this.setState({postTradeDetails: _postTradeDetails}) 
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.onPostTradeFormSubmit(
      this.state.postTradeDetails,
      this.state.web3.web3,
      this.state
    )
  }
  render() {

    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="tradeType">Trade Type</label>
          <input id="tradeType" name="tradeType" type="radio" value='sell-ether' onChange={this.onTradeTypeChange.bind(this)} />Sell Ether
          <input id="tradeType" name="tradeType" type="radio" value='buy-ether' onChange={this.onTradeTypeChange.bind(this)} />Buy Ether
          <br />
          <label htmlFor="location">Location</label>
          <input id="location" name="location" type="text" value={this.state.postTradeDetails.location} onChange={this.onInputChange.bind(this)} placeholder="Enter a Location" />
          <span className="pure-form-message">For online trade you need to specify the country. For local trade, please specify a city, postal code or street name.</span>
          <br/>
          <label htmlFor="paymentMethod">Payment Method</label>
            <select id="paymentMethod" name="paymentMethod" onChange={this.onPaymentMethodChange.bind(this)}>
              <option value="UPI">UPI</option>
              <option value="neft">neft</option>
              <option value="IMPS">IMPS</option>
              <option value="cash">cash</option>
              <option value="payTm">payTm</option>
              <option value="RTGS">RTGS</option>
            </select>


          { (this.state.buyFormBool) ? <BuyForm 
            onChangeProp={this.onInputChange.bind(this)} 
            amount={this.state.postTradeDetails.amount} 
            paymentMethod={this.state.postTradeDetails.paymentMethod}
            onCurrencyChange={this.onCurrencyChange.bind(this)}
            bankInformation={this.state.postTradeDetails.bankInformation}
            minTransactionLimit={this.state.postTradeDetails.minTransactionLimit}
            maxTransactionLimit={this.state.postTradeDetails.maxTransactionLimit}
            termsOfTrade={this.state.postTradeDetails.termsOfTrade}/> : <SellForm 
            onChangeProp={this.onInputChange.bind(this)}/>
          }
          <button type="submit" className="pure-button pure-button-primary">Post Trade</button>
        </fieldset>
      </form>
    )
  }
}

export default PostTradeForm
