import React, { Component } from 'react';
import Converter from '../ui/Converter';
import Star from '../../images/Star';
import { browserHistory } from 'react-router'

export default class BuyTradeAdvertisement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      etherAmount: 0,
      fiatAmount: 0,
      isButtonDisabled: false
    };
    this.createPurchaseRequest = this.createPurchaseRequest.bind(this)
    this.onAmountChange = this.onAmountChange.bind(this)
  }

  componentWillMount() {
    this.props.onBeforeComponentLoad(this.props.buytradeadvertisements, this.props.buyTradeAdvertisementId, this.props.users);
    //this.setState({etherAmount:this.props.buytradeadverisement})
  }

  componentWillUnmount(){
    this.props.onBeforeComponentWillUnmount()
  }

  createPurchaseRequest(e){
    e.preventDefault()
    this.setState({isButtonDisabled:true})
    this.props.createPurchaseRequest(
      this.state.etherAmount, 
      this.state.fiatAmount,
      this.props.etherPrice.data,
      this.props.buyTradeAdvertisementId,
      this.props.buytradeadvertisement.data,
      this.props.buyer,
      this.props.web3.web3.eth.coinbase,
      this.props.user
      )
  }

  onAmountChange(e) {
    var marginMultiplier = (1 + (parseInt(this.props.buytradeadvertisement.data.margin, 10) * 0.01))
    if(e.target.id === 'etherAmount') {
      this.setState({etherAmount: e.target.value});
      this.setState({fiatAmount: (e.target.value * (this.props.etherPrice.data * marginMultiplier).toFixed(2)).toFixed(2)})
    } else if(e.target.id === 'fiatAmount') {
      this.setState({fiatAmount: e.target.value});
      this.setState({etherAmount: (e.target.value / (this.props.etherPrice.data * marginMultiplier).toFixed(2)).toFixed(2)})
    }
  }


  onFiatAmountChange(e) {
    console.log('fiat changed');
    console.log(e.target.value);
  }


  render () {
    var buyTradeAdvertisement = this.props.buytradeadvertisement.data;
    var buyer = this.props.buyer.data
    var requestComponent = <div className='w-50' >
      <h2 className='pv1 tc'>Getting balance...</h2>
    </div>;
    if(buyTradeAdvertisement && buyer) {
      var marginMultiplier = (1 + (parseInt(this.props.buytradeadvertisement.data.margin,10) * 0.01))
      var price = this.props.etherPrice ? (this.props.etherPrice.data * marginMultiplier).toFixed(2) : null;
      // TODO get the available balance from web3
      var availableBalance = 10
      if(typeof availableBalance !== 'undefined') {
        if(availableBalance > 0) {
          requestComponent = <div className='w-50' >
            <h2 className='pv1 tc'>How much do you wish to sell?</h2>
            <h2 className='pv1 tc'>Available:{availableBalance} Ether</h2>
            <div className='flex mxc'><Converter maxEther={availableBalance} 
              handleTradeRequest={this.createPurchaseRequest.bind(this)}
              onAmountChange={this.onAmountChange.bind(this)} 
              currency={this.props.user.profile.currency} 
              price={price} 
              country={buyer.country} 
              etherAmount={this.state.etherAmount} 
              fiatAmount={this.state.fiatAmount} 
              tradeAdvertisementAmount={buyTradeAdvertisement.amount}
              isButtonDisabled={this.state.isButtonDisabled}
              /></div>
          </div>
        } else {
          requestComponent = <div className='w-50' >
            <h2 className='pv1 tc'>Sorry, the seller does not have enough ether to sell.</h2>
            <button>Return to Buy page</button>
          </div>
        }
      }
      var url = '/user/' + buyTradeAdvertisement.buyerUid
      return (
        <div className='w-100 bg-smoke vh-100'>
          <div className='w-75 center pv3'>
            <h1 className='pv1'>Sell {buyTradeAdvertisement.amount} ether to {buyer.username} using {buyTradeAdvertisement.paymentMethod}</h1>
            <div className='flex mxb w-100 cxc'>
              <div className='w-50'>
                <div className='w-100'>
                  <p className='b tc measure'>Terms of Trade</p>
                  <p className='pv1 measure'>
                  {buyTradeAdvertisement.termsOfTrade}
                  </p>
                </div>
                <div className='mt3'>
                <table className='lh-copy'>
                <tbody>
                  <tr>
                    <td className='w4 pv2'>Price</td>
                    <td className='green'>{price ? price : 'Getting price...'} {this.props.user.profile.currency + '/ETH'}</td>
                  </tr>
                  <tr>
                    <td className='w4 pv2'>Payment Method</td>
                    <td>{buyTradeAdvertisement.paymentMethod}</td>
                  </tr>
                  <tr>
                    <td className='w4 pv2'>User</td>
                    <td><a onClick={()=>browserHistory.push(url)}>{buyer.username}</a> ({buyer.avgFeedback}<Star className='dib v-mid pb1' />)</td>
                  </tr>
                  <tr>
                    <td className='w4 pv2'>Trade Limits</td>
                    <td>{buyTradeAdvertisement.minTransactionLimit}- {buyTradeAdvertisement.maxTransactionLimit} {buyTradeAdvertisement.currency}</td>
                  </tr>
                  <tr>
                    <td className='w4 pv2'>Location</td>
                    <td>{buyTradeAdvertisement.location}</td>
                  </tr>
                </tbody>
                </table>
                </div>
              </div>
              {requestComponent}
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
