// ISSUE-231-60: change name of file to BuyTradeAdverisement

import React, { Component } from 'react';
import Converter from '../ui/Converter';
import Star from '../../images/Star';

export default class BuyTradeOrder extends Component {
  constructor (props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      etherPrice: this.props.etherPrice,
      user: this.props.user,
      sellOrderDetail: this.props.sellOrderDetail,
      sellOrderContract: this.props.sellOrderContract,
      requestAmount: 0,
      etherAmount: 0,
      fiatAmount: 0,
      rating: 4.5
    };
    this.handleConversion = this.handleConversion.bind(this);
    this.handleTradeRequest = this.handleTradeRequest.bind(this);
  }

  handleTradeRequest (e) {
    e.preventDefault();
    this.props.requestEther(this.state.requestAmount,
                            this.props.etherPrice.data,
                            this.props.sellOrderDetail.sellOrder,
                            this.props.user.data.uid,
                            this.props.user.data.displayName,
                            this.props.web3.web3);
  }

  handleConversion (amount) {
    console.log('conversion handled');
    console.log(amount);
  }

  onAmountChange(e) {
    if(e.target.id === 'etherAmount') {
      console.log('ether changed');
      console.log(e.target.value);
      this.setState({etherAmount: e.target.value});
      this.setState({fiatAmount: (e.target.value * (this.props.etherPrice.data * this.props.sellOrderDetail.sellOrder.margin).toFixed(2)).toFixed(2)})
    } else if(e.target.id === 'fiatAmount') {
      console.log('fiat changed');
      console.log(e.target.value);
      this.setState({fiatAmount: e.target.value});
      this.setState({etherAmount: (e.target.value / (this.props.etherPrice.data * this.props.sellOrderDetail.sellOrder.margin).toFixed(2)).toFixed(2)})
    }


  }

  onFiatAmountChange(e) {
    console.log('fiat changed');
    console.log(e.target.value);
  }

  componentWillMount(){
    this.props.onBeforeComponentLoad(this.props.params.orderId, this.props.web3.web3);
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render () {
    var sellOrder = this.props.sellOrderDetail.sellOrder;
    var userInfo = this.props.user.userInfo;
    var requestComponent = <div className='w-50' >
      <h2 className='pv1 tc'>Getting balance...</h2>
    </div>;
    if(sellOrder && userInfo) {
      var price = this.props.etherPrice ? (this.props.etherPrice.data * sellOrder.margin).toFixed(2) : null;
      var availableBalance = this.props.sellOrderContract.availableBalance;
      if(typeof availableBalance !== 'undefined') {
        if(availableBalance > 0) {
          requestComponent = <div className='w-50' >
            <h2 className='pv1 tc'>How much do you wish to buy?</h2>
            <h2 className='pv1 tc'>Available:{availableBalance} Ether</h2>
            <div className='flex mxc'><Converter maxEther={availableBalance} handleTradeRequest={this.handleTradeRequest.bind(this)}
              onAmountChange={this.onAmountChange.bind(this)} currency={this.props.user.currency} price={price} country={userInfo.country} etherAmount={this.state.etherAmount} fiatAmount={this.state.fiatAmount} /></div>
          </div>
        } else {
          requestComponent = <div className='w-50' >
            <h2 className='pv1 tc'>Sorry, the seller does not have enough ether to sell.</h2>
            <button>Return to Buy page</button>
          </div>
        }
      }
      return (
        <div className='w-100 bg-smoke vh-100'>
          <div className='w-75 center pv3'>
            <h1 className='pv1'>Buy ether using {sellOrder.paymentMethod} from {userInfo.username}</h1>
            <div className='flex mxb w-100 cxc'>
              <div className='w-50'>
                <table className='lh-copy'>
                  <tr>
                    <td className='w4 pv2'>Price</td>
                    <td className='green'>{this.props.etherPrice.data ? (this.props.etherPrice.data * sellOrder.margin).toFixed(2) : 'Getting price...'} {this.props.user.currency}/ETH</td>
                  </tr>
                  <tr>
                    <td className='w4 pv2'>Payment Method</td>
                    <td>{sellOrder.paymentMethod}</td>
                  </tr>
                  <tr>
                    <td className='w4 pv2'>User</td>
                    <td>{userInfo.username} ({this.state.rating}<Star className='dib v-mid pb1' />)</td>
                  </tr>
                  <tr>
                    <td className='w4 pv2'>Trade Limits</td>
                    <td>{sellOrder.minTransactionLimit}- {sellOrder.maxTransactionLimit} {sellOrder.currency}</td>
                  </tr>
                  <tr>
                    <td className='w4 pv2'>Location</td>
                    <td>{sellOrder.location}</td>
                  </tr>
                </table>
              </div>
              {requestComponent}
            </div>
            <div>
              <div>
                <div className='w-50 mt5'>
                  <p className='b tc measure'>Terms of Trade</p>
                  <p className='pv1 measure'>
                  {sellOrder.termsOfTrade}
              </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  } else {
    return(
      <div>Loading...</div>
    )
  }
  }
}
