import React, { Component } from 'react';

export class BuyForm extends Component {
  render() {
    return (
      <div>
        {this.props.paymentMethod === 'neft' ||
        this.props.paymentMethod === 'IMPS' ||
        this.props.paymentMethod === 'RTGS' ||
        this.props.paymentMethod === 'National Bank' ? (
          <div className="flex mb3">
            <label htmlFor="bankInformation" className="w5">
              Bank Information
            </label>
            <textarea
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
          <label htmlFor="amount" className="w5">
            Amount to Buy
          </label>
          <input
            id="amount"
            type="number"
            step="0.00001"
            min="0.00001"
            onChange={this.props.onChangeProp}
            value={this.props.amount}
            className="w5 h-100"
            required
            data-test="submitATradeAmountToBuy"
          />
          <div className="min-w-30 me pl3">
            <span className="fw1 i">Amount in Ether</span>
          </div>
        </div>

        <div className="flex mb3">
          <label htmlFor="minTransactionLimit" className="w5">
            Min Transaction Limit
          </label>
          <div className="flex w5 h-100">
            <input
              id="minTransactionLimit"
              type="number"
              onChange={this.props.onChangeProp}
              value={this.props.minTransactionLimit}
              className="br--white"
              min="1"
              max="1000000"
              required
              data-test="submitATradeMinTransaction"
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
              id="maxTransactionLimit"
              type="number"
              onChange={this.props.onChangeProp}
              value={this.props.maxTransactionLimit}
              className="br--white"
              min="1"
              max="1000000"
              data-test="submitATradeMaxTransaction"
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
            id="termsOfTrade"
            type="textArea"
            onChange={this.props.onChangeProp}
            value={this.props.termsOfTrade}
            className="w5"
            placeholder="For example, This advertisement is only for cash trades. If you want to pay
            online, contact automte.com/ad/1234."
            rows="4"
            required
            data-test="submitATradeTerms"
          />
          <span className="measure-narrow fw1 i pa0 me pl3">
            Other information you wish to tell about your trade.
          </span>
        </div>
      </div>
    );
  }
}

export default BuyForm;
