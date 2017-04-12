import React, { Component } from 'react';
import { BuyForm } from './BuyForm';
import { SellForm } from './SellForm';
import PostTradeInstructions from './PostTradeInstructions';
// import {Input} from '../../components/Input';
import { Link } from 'react-router';

class PostTradeForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      web3: this.props.web3,
      postTradeDetails: {
        tradeType: '',
        amount: 0,
        location: '',
        // TODO check this ( who wrote this? Please tag your name so we know whos to do it is')
        buyerAddress: '',
        buyerUid: '',
        sellerAddress: '',
        sellerUid: '',
        paymentMethod: '',
        bankInformation: '',
        minTransactionLimit: '',
        maxTransactionLimit: '',
        termsOfTrade: '',
        status:'',
        active:false
      },
      buyFormBool: false,
      user: this.props.user,
      uid: this.props.uid,
      currentETHMarketValue: 1203
    };
  }

  componentWillMount () {
    var connectedAccount = this.props.web3.web3.eth.accounts[0];
    this.setState({postTradeDetails: {
                                      amount: 0,
                                      buyerAddress: connectedAccount,
                                      tradeType: 'buy-ether',  //NOTE Arseniy: Set this on mount because buy-ether is the checked tradeType on load.
                                      buyerUid: this.props.uid //If the default trade type is change for whatever reason, tradeType and buyerUid must be changed as well.
                                    }});
  }

  onInputChange (event) {
    var _postTradeDetails = this.state.postTradeDetails;
    if (event.target.id === 'location') {
      _postTradeDetails['location'] = event.target.value;
      // this.setState({ postTradeDetails: _postTradeDetails })
    } else if (event.target.id === 'margin') {
      _postTradeDetails['margin'] = event.target.value;
    } else if (event.target.id === 'equation') {
      _postTradeDetails['equation'] = event.target.value;
    } else if (event.target.id === 'amount') {
      _postTradeDetails['amount'] = event.target.value;
    } else if (event.target.id === 'bankInformation') {
      _postTradeDetails['bankInformation'] = event.target.value;
    } else if (event.target.id === 'location') {
      _postTradeDetails['location'] = event.target.value;
    } else if (event.target.id === 'minTransactionLimit') {
      _postTradeDetails['minTransactionLimit'] = event.target.value;
    } else if (event.target.id === 'maxTransactionLimit') {
      _postTradeDetails['maxTransactionLimit'] = event.target.value;
    } else if (event.target.id === 'restrictTo') {
      _postTradeDetails['restrictTo'] = event.target.value;
    } else if (event.target.id === 'termsOfTrade') {
      _postTradeDetails['termsOfTrade'] = event.target.value;
    }
    this.setState({ postTradeDetails: _postTradeDetails });
  }

  onTradeTypeChange (event) {
    var _postTradeDetails = this.state.postTradeDetails;
    var _buyFormBool = this.state.buyFormBool;
    _postTradeDetails['tradeType'] = event.target.value;
    if (_postTradeDetails['tradeType'] === 'sell-ether') {
      _postTradeDetails = Object.assign({},
        this.state.postTradeDetails, {
          tradeType: event.target.value,
          sellerUid: this.state.uid,
          buyerUid: ''
        }
      );
      _buyFormBool = false;
    } else {
      _postTradeDetails = Object.assign({},
      this.state.postTradeDetails, {
        tradeType: event.target.value,
        buyerUid: this.state.uid,
        sellerUid: ''
      }
    );
      _buyFormBool = true;
    }

    this.setState({ postTradeDetails: _postTradeDetails, buyFormBool: _buyFormBool });
  }

  onPaymentMethodChange (event) {
    var _postTradeDetails = Object.assign({},
      this.state.postTradeDetails,
      {paymentMethod: event.target.value}
      );
    this.setState({postTradeDetails: _postTradeDetails});
  }

  onCurrencyChange (event) {
    var _postTradeDetails = Object.assign({},
      this.state.postTradeDetails,
      {currency: event.target.value}
      );
    this.setState({postTradeDetails: _postTradeDetails});
  }

  handleSubmit (event) {
    event.preventDefault();
    var now = new Date();
    var orderId = this.state.web3.web3.sha3(this.state.user.data.uid + '-' + now);
    var _postTradeDetails = Object.assign({},
      this.state.postTradeDetails,
      {lastUpated: now.toUTCString(),
        orderId: orderId,
        status: 'Initiated',
        active: true
      }
      );
    if (this.state.postTradeDetails.tradeType === 'sell-ether') {
      this.props.onPostTradeFormSubmit(
        _postTradeDetails,
        this.state.web3.web3,
        this.state
      );
    }
    if (this.state.postTradeDetails.tradeType === 'buy-ether') {
      this.props.onBuyEtherFormSubmit(
        _postTradeDetails,
        this.state.web3.web3,
        this.state
        );
    }
  }

  render () {
    return (
      <div>
        <div>
          <PostTradeInstructions />
        </div>
        <form className='mv3' onSubmit={this.handleSubmit.bind(this)}>
          <fieldset >
            <legend className='b f4 mv3'>Trade Information</legend>
            <div className='flex pa0 mv3'>
              <p className='w5'>I want to...</p>
              <div className='flex col'>
                <label htmlFor='sellTradeType'> <input id='sellTradeType' name='tradeType' type='radio' value='sell-ether' onChange={this.onTradeTypeChange.bind(this)}
                  className='mr2' />Sell Ether</label>
                <label htmlFor='buyTradeType'><input id='buyTradeType' name='tradeType' type='radio' value='buy-ether' onChange={this.onTradeTypeChange.bind(this)}
                  className='mr2' defaultChecked='true' />Buy Ether</label>
              </div>
              <span className='measure-narrow fw1 i pa0 me'>
                What kind of trade advertisement do you wish to create? If you wish to sell ether make sure you have ether in your Metamask wallet.
              </span>
            </div>

            <div className='flex mv3'>
              <label htmlFor='location' className='w5' >Location</label>
              <input id='location' name='location' type='text' valueProp={this.state.postTradeDetails.location} onChangeProp={this.onInputChange.bind(this)}
                placeholder='Enter a Location' className='w5 h-100' />
              <span className='measure-narrow fw1 i pa0 me'>For online trade you need to specify the country. For local trade, please specify a city, postal code or street name.</span>
            </div>

            <div className='flex mv3'>
              <label htmlFor='margin' className='w5' >Margin</label>
              <input id='margin' name='margin' type='number' value={this.state.postTradeDetails.margin} onChange={this.onInputChange.bind(this)} className='w5 h-100 percent' />
              <span className='measure-narrow fw1 i pa0 me'>Margin you want over the ether market price. Use a negative value for buying or selling under the market price to attract more contracts. For more complex pricing edit the price equation directly.</span>
            </div>

            <div className='flex mv3'>
              <label htmlFor='equation' className='w5' >Price equation</label>
              <div className='flex col'><input id='equation' name='equation' type='text' value={this.state.postTradeDetails.equation} onChange={this.onInputChange.bind(this)} placeholder='Kraken_API' className='w5' />
                <small className='f6 fw3 mt3'>Trade price with current market value <span className='green'>{this.state.currentETHMarketValue} INR/ETH</span></small>
              </div>

              <span className='measure-narrow fw1 i pa0 me'>
                  How the trade price is determined from the hourly market price. For more information about equations how to determine your traing price see pricing FAQ.
                  <span className='b fw1'>
                    Please note that the advertiser is always responsible for all payment processing fees.
                  </span>
              </span>
            </div>

            <div className='flex mv3'>
              <label htmlFor='paymentMethod' className='w5'>Payment Method</label>
              <select id='paymentMethod' name='paymentMethod' onChange={this.onPaymentMethodChange.bind(this)}
                className='w5'>
                <option value='UPI'>UPI</option>
                <option value='neft'>neft</option>
                <option value='IMPS'>IMPS</option>
                <option value='cash'>cash</option>
                <option value='payTm'>payTm</option>
                <option value='RTGS'>RTGS</option>
              </select>
            </div>

            { (this.state.buyFormBool) ? <SellForm
              onChangeProp={this.onInputChange.bind(this)} /> : <BuyForm
                onChangeProp={this.onInputChange.bind(this)}
                amount={this.state.postTradeDetails.amount}
                paymentMethod={this.state.postTradeDetails.paymentMethod}
                onCurrencyChange={this.onCurrencyChange.bind(this)}
                bankInformation={this.state.postTradeDetails.bankInformation}
                minTransactionLimit={this.state.postTradeDetails.minTransactionLimit}
                maxTransactionLimit={this.state.postTradeDetails.maxTransactionLimit}
                termsOfTrade={this.state.postTradeDetails.termsOfTrade} />
            }

            <div className='flex mv3'>
              <label className='w5 ' />
              <input
                type='submit'
                className='mv5'
                value='Publish Advertisement' />
            </div>

          </fieldset>
        </form>
      </div>
    );
  }
}

export default PostTradeForm;
