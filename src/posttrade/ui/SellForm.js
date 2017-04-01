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
          <input id='bankInformation' type='text' onChange={this.props.onChangeProp} value={this.props.bankInformation} className='w5' />
          <div className='min-w-30 me'>
            <span className='fw1 i'>Your Bank</span>
          </div>
        </div>
        <div className='flex mb3'>
          <label htmlFor='amount' className='w5'>Amount to buy</label>
          <input id='amount' type='text' onChange={this.props.onChangeProp} value={this.props.amount} className='w5' />
          <div className='min-w-30 me'>
            <span className='fw1 i'>Amount in Ether</span>
          </div>
        </div>
        <div className='flex mb3'>
          <label htmlFor='minTransactionLimit' className='w5'>Min Transaction Limit</label>
          <input id='minTransactionLimit' type='text' onChange={this.props.onChangeProp} value={this.props.minTransactionLimit} className='w5' />
          <div className='min-w-30 me'><span className='fw1 i'>Min Transaction Limit</span></div>
        </div>
        <div className='flex mb3'>
          <label htmlFor='maxTransactionLimit' className='w5'>Max Transaction Limit</label>
          <input id='maxTransactionLimit' type='text' onChange={this.props.onChangeProp} value={this.props.maxTransactionLimit} className='w5' />
          <div className='min-w-30 me'><span className='fw1 i'>Max Transaction Limit</span></div>
        </div>
        <div className='flex mb3'>
          <label htmlFor='termsOfTrade' className='w5'>terms of trade</label>
          <input id='termsOfTrade' type='textArea' onChange={this.props.onChangeProp} value={this.props.termsOfTrade} className='w5' />
          <div className='min-w-30 me'><span className='fw1 i'>terms Of Trade</span></div>
        </div>
      </div>
    );
  }
}

export default SellForm;
