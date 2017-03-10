import React, { Component } from 'react'


export class BuyForm extends Component {
  render(){
    return(
      <div>
      <label htmlFor="currency">Currency</label>
      <select id="currency" onChange={this.props.onCurrencyChange}>
        <option value="INR">INR</option>
        <option value="USD">USD</option>
      </select>
      <label htmlFor="bankInformation">Bank Information</label>
      <input id="bankInformation" type="text" onChange={this.props.onChangeProp} value={this.props.bankInformation}/>
      <span>Your Bank</span>
      <br/>
      <label htmlFor="amount">Amount to buy</label>
      <input id="amount" type="text" onChange={this.props.onChangeProp} value={this.props.amount}/>
      <span>Amount in Ether</span>
      <br/>
      <label htmlFor="minTransactionLimit">Min Transaction Limit</label>
      <input id="minTransactionLimit" type="text" onChange={this.props.onChangeProp} value={this.props.minTransactionLimit}/>
      <span>Min Transaction Limit</span>
      <br/>
      <label htmlFor="maxTransactionLimit">Max Transaction Limit</label>
      <input id="maxTransactionLimit" type="text" onChange={this.props.onChangeProp} value={this.props.maxTransactionLimit}/>
      <span>Max Transaction Limit</span>
      <br/>
      <label htmlFor="termsOfTrade">terms of trade</label>
      <input id="termsOfTrade" type="textArea" onChange={this.props.onChangeProp} value={this.props.termsOfTrade}/>
      <span>terms Of Trade</span>
      <br/>
      
      </div>
      )
  } 
}



export default BuyForm