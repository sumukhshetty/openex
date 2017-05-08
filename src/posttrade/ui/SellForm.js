import React, { Component } from 'react';

export class SellForm extends Component {
  render () {
    return (
      <div>
        <div className='flex mb3'>
          <label htmlFor='currency' className='w5'>Currency</label>
          <select id='currency' onChange={this.props.onCurrencyChange}className='w5' >
            <option value='INR'>INR</option>
            <option value='USD'>USD</option>
          </select>
        </div>
        <div className='flex mb3'>
          <label htmlFor='bankInformation' className='w5'>Bank Information</label>
          <textarea id='bankInformation' type='textArea' rows="4" onChange={this.props.onChangeProp} value={this.props.bankInformation} className='w5' required/>
          <div className='min-w-30 me'>
            <span className='fw1 i'>Your Name <br/>CITI0000xxx <br/> mg road, bangalore <br/>
Acc: 5223xxxxxx</span>
          </div>
        </div>
        <div className='flex mb3'>
          <label htmlFor='minTransactionLimit' className='w5'>Min Transaction Limit</label>
          <input id='minTransactionLimit' type='number' onChange={this.props.onChangeProp} value={this.props.minTransactionLimit} className='w5 inr' required/>
          <div className='min-w-30 me'><span className='fw1 i'>Min Transaction Limit</span></div>
        </div>
        <div className='flex mb3'>
          <label htmlFor='maxTransactionLimit' className='w5 '>Max Transaction Limit</label>
          <input id='maxTransactionLimit' type='number' onChange={this.props.onChangeProp} value={this.props.maxTransactionLimit} className='w5 inr h-100' required/>
          <span className='measure-narrow fw1 i pa0 me'>Optional. Maximum transaction limit in one trade. For online sells, your
sell smart contract balance may limit the maximum fundable trade also.</span>
        </div>

        <div className='flex mb3'>
          <label htmlFor='restrictTo' className='w5 '>Restrict Amount to</label>
          <input id='restrictTo' type='number' onChange={this.props.onChangeProp} value={this.props.restrictTo} className='w5 inr h-100' required/>

          <span className='measure-narrow fw1 i pa0 me'>  Optional. Restrict trading amounts to specific comma-separated integers, for example 200,500,1000. In fiat currency (INR/EUR/etc). Handy for coupons, gift cards, etc.</span>
        </div>
        <div className='flex mb3'>
          <label htmlFor='termsOfTrade' className='w5'>Terms of trade</label>
          <textarea id='termsOfTrade' type='textArea' onChange={this.props.onChangeProp} value={this.props.termsOfTrade} className='w5' placeholder='For example, please make request only when you can complete the payment
           with cash within 12 hours.' rows='4' required/>
          <span className='measure-narrow fw1 i pa0 me'>Other information you wish to tell about your trade.</span>
        </div>
      </div>
    );
  }
}

export default SellForm;
