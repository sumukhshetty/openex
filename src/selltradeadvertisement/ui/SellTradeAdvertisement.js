import React, { Component } from 'react';
import Converter from './Converter';
import Star from './../../images/Star';

export default class SellTradeAdvertisement extends Component {
  constructor (props) {
    super(props);
    this.state = {
      etherAmount: 0,
      fiatAmount: 0,
    };
    this.createPurchaseRequest = this.createPurchaseRequest.bind(this)
  }

  componentWillMount(){
    this.props.onBeforeComponentLoad(this.props.selltradeadvertisements, this.props.sellTradeAdvertisementId, this.props.users)
  }

  componentWillUnmount(){
    this.props.onBeforeComponentWillUnmount()
  }

  createPurchaseRequest(e){
    e.preventDefault()
    this.props.createPurchaseRequest(
      this.state.etherAmount, 
      this.state.fiatAmount,
      this.props.etherPrice.data,
      this.props.sellTradeAdvertisementId,
      this.props.selltradeadvertisement.data, 
      this.props.seller, 
      this.props.web3.web3.eth.coinbase,
      this.props.user)
  }

  onAmountChange(e) {
    var marginMultiplier = (1 + (parseInt(this.props.selltradeadvertisement.data.margin, 10) * 0.01))
    if(e.target.id === 'etherAmount') {
      this.setState({etherAmount: e.target.value});
      this.setState({fiatAmount: (e.target.value * (this.props.etherPrice.data * marginMultiplier).toFixed(2)).toFixed(2)})
    } else if(e.target.id === 'fiatAmount') {
      this.setState({fiatAmount: e.target.value});
      this.setState({etherAmount: (e.target.value / (this.props.etherPrice.data * marginMultiplier).toFixed(2)).toFixed(2)})
    }
  }

  render () {
    console.log("SellTradeAdvertisement.render")
    console.log(this.props)
    var sellTradeAdvertisement = this.props.selltradeadvertisement.data;
    var seller = this.props.seller.data
    var requestComponent = <div className='w-50' >
      <h2 className='pv1 tc'>Getting balance...</h2>
    </div>;
    if(sellTradeAdvertisement && seller) {
      // ISSUE-255 check the price is getting set correctly this works 
      // this sets the price to the current price of ether rather than the price set in the trade advertisement
      var marginMultiplier = (1 + (parseInt(sellTradeAdvertisement.margin, 10) * 0.01))
      var price = this.props.etherPrice ? (this.props.etherPrice.data * marginMultiplier).toFixed(2) : null;
      // ISSUE-254 get available balance from the ETHOrderBook 
      //var availableBalance = this.props.sellOrderContract.availableBalance;
      var availableBalance = 10
      if(typeof availableBalance !== 'undefined') {
        if(availableBalance > 0) {
          requestComponent = <div className='w-50' >
            <h2 className='pv1 tc'>How much do you wish to buy?</h2>
            <h2 className='pv1 tc'>Available:{availableBalance} Ether</h2>
            <div className='flex mxc'><Converter maxEther={availableBalance} 
              handleTradeRequest={this.createPurchaseRequest.bind(this)}
              onAmountChange={this.onAmountChange.bind(this)} 
              currency={this.props.user.profile.currency} 
              price={price} 
              country={seller.country} 
              etherAmount={this.state.etherAmount} 
              fiatAmount={this.state.fiatAmount} /></div>
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
            <h1 className='pv1'>Buy ether using {sellTradeAdvertisement.paymentMethod} from {seller.username}</h1>
            <div className='flex mxb w-100 cxc'>
              <div className='w-50'>
                <table className='lh-copy'>
                  <tr>
                    <td className='w4 pv2'>Price</td>
                    {/*ISSUE-255 this works if margin is saved as a decimal*/}
                    <td className='green'>{this.props.etherPrice.data ? (this.props.etherPrice.data * marginMultiplier).toFixed(2) : 'Getting price...'} {this.props.user.profile.currency}/ETH</td>
                  </tr>
                  <tr>
                    <td className='w4 pv2'>Payment Method</td>
                    <td>{sellTradeAdvertisement.paymentMethod}</td>
                  </tr>
                  <tr>
                    <td className='w4 pv2'>User</td>
                    <td>{seller.username} ({seller.avgFeedback}<Star className='dib v-mid pb1' />)</td>
                  </tr>
                  <tr>
                    <td className='w4 pv2'>Trade Limits</td>
                    <td>{sellTradeAdvertisement.minTransactionLimit}- {sellTradeAdvertisement.maxTransactionLimit} {sellTradeAdvertisement.currency}</td>
                  </tr>
                  <tr>
                    <td className='w4 pv2'>Location</td>
                    <td>{sellTradeAdvertisement.location}</td>
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
                  {sellTradeAdvertisement.termsOfTrade}
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
