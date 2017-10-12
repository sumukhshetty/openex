import React, { Component } from 'react'

export class SellForm extends Component {
  render() {
    return (
      <div>
        {/* <div className='flex mb3'>
          <label htmlFor='currency' className='w5'>Currency</label>
        <input id='currency' value={this.props.currency} className='w5 h-100' disabled required/> */}
        {/* <select id='currency' onChange={this.props.onCurrencyChange}className='w5' >
            <option value='INR'>INR</option>
            <option value='USD'>USD</option>
        </select> */}
        {/* </div>  */}

        {this.props.paymentMethod === 'neft' ||
        this.props.paymentMethod === 'IMPS' ||
        this.props.paymentMethod === 'RTGS' ||
        this.props.paymentMethod === 'National Bank' ? (
          <div className="flex mb3">
            <label htmlFor="bankInformation" className="w5">
              Bank Information
            </label>
            <textarea
              data-test="submitATradeBankInfo"
              id="bankInformation"
              type="textArea"
              rows="4"
              onChange={this.props.onChangeProp}
              value={this.props.bankInformation}
              className="w5"
              required
            />
            <div className="min-w-30 me pl3">
              <span className="fw1 i">
                Your Name <br />
                CITI0000xxx <br />
                mg road, bangalore <br />
                Acc: 5223xxxxxx
              </span>
            </div>
          </div>
        ) : null}

        <div className="flex mb3">
          <label htmlFor="minTransactionLimit" className="w5">
            Min Transaction Limit
          </label>
          <div className="flex w5 h-100">
            <input
              data-test="submitATradeMinTransaction"
              id="minTransactionLimit"
              type="number"
              onChange={this.props.onChangeProp}
              value={this.props.minTransactionLimit}
              className="br--white"
              min="1"
              max="1000000"
              required
            />
            <button
              className="ftiny br0 bg-gray bl--gray b--blue ba gray"
              disabled
            >
              {this.props.currency}
            </button>
          </div>
          <div className="min-w-30 me pl3">
            <span className="fw1 i">Min Transaction Limit</span>
          </div>
        </div>
        <div className="flex mb3">
          <label htmlFor="maxTransactionLimit" className="w5 ">
            Max Transaction Limit
          </label>
          <div className="flex w5 h-100">
            <input
              data-test="submitATradeMaxTransaction"
              id="maxTransactionLimit"
              type="number"
              onChange={this.props.onChangeProp}
              value={this.props.maxTransactionLimit}
              className="br--white"
              min="1"
              max="1000000"
              required
            />
            <button
              className="ftiny br0 bg-gray bl--gray b--blue ba gray"
              disabled
            >
              {this.props.currency}
            </button>
          </div>
          <span className="measure-narrow fw1 i pa0 me pl3">
            Optional. Maximum transaction limit in one trade. For online sells,
            your sell smart contract balance may limit the maximum fundable
            trade also.
          </span>
        </div>

        <div className="flex mb3">
          <label htmlFor="termsOfTrade" className="w5">
            Terms of trade
          </label>
          <textarea
            data-test="submitATradeTerms"
            id="termsOfTrade"
            type="textArea"
            onChange={this.props.onChangeProp}
            value={this.props.termsOfTrade}
            className="w5"
            placeholder="For example, please make request only when you can complete the payment
            with cash within 12 hours."
            rows="4"
            required
          />
          <span className="measure-narrow fw1 i pa0 me pl3">
            Other information you wish to tell about your trade.
          </span>
        </div>
      </div>
    )
  }
}

export default SellForm
