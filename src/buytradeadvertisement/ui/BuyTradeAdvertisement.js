import React, { Component } from 'react';
import Converter from '../ui/Converter';
import Star from '../../images/Star';

export default class BuyTradeAdvertisement extends Component {
  constructor (props) {
    super(props);
    this.handleConversion = this.handleConversion.bind(this);
    this.acceptOrder = this.acceptOrder.bind(this);
  }

  componentWillMount() {
    this.props.onBeforeComponentLoad(this.props.buytradeadvertisements, this.props.buyTradeAdvertisementId, this.props.users);
  }

  componentWillUnmount(){
    this.props.onBeforeComponentWillUnmount()
  }

  sellerCreatesPurchaseRequest(){
    this.props.createPurchaseRequest(this.props.user, this.props.buyTradeAdvertisement)
  }

  handleConversion (amount) {
    console.log('conversion handled');
    console.log(amount);
  }

  onEtherAmountChange(e) {
    console.log('ether changed');
    console.log(e.target.value);
    this.setState({requestAmount: e.target.value});

  }

  onFiatAmountChange(e) {
    console.log('fiat changed');
    console.log(e.target.value);
  }


  render () {
    console.log("BuyTradeAdvertisement")
    var buyTradeAdvertisement = this.props.buyTradeAdvertisement;
    console.log(buyTradeAdvertisement)
    //var userInfo = this.props.user.userInfo;
    var buyer = this.props.buyer
    if(this.props.buyTradeAdvertisement && this.props.buyer) {
    var price = this.props.etherPrice ? (this.props.etherPrice.data * buyTradeAdvertisement.margin).toFixed(2) : null;
    return (
      <div className='w-100 bg-smoke vh-100'>
        <div className='w-75 center pv3'>
          <h1 className='pv1'>Sell {buyTradeAdvertisement.amount} ether to {buyer.username} using {buyTradeAdvertisement.paymentMethod}</h1>
          <div className='flex mxb w-100 cxc'>
            <div className='w-50'>
              <table className='lh-copy'>
                <tr>
                  <td className='w4 pv2'>Price</td>
                  <td className='green'>{price ? price : 'Getting price...'} {this.props.user.currency + '/ETH'}</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>Payment Method</td>
                  <td>{buyTradeAdvertisement.paymentMethod}</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>User</td>
                  <td>{buyer.username} ({buyer.avgFeedback}<Star className='dib v-mid pb1' />)</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>Trade Limits</td>
                  <td>{buyTradeAdvertisement.minTransactionLimit}- {buyTradeAdvertisement.maxTransactionLimit} {buyTradeAdvertisement.currency}</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>Location</td>
                  <td>{buyTradeAdvertisement.location}</td>
                </tr>
              </table>
            </div>
            <div className='w-50' >
              {/* <h2 className='pv1 tc'>How much do you wish to buy?</h2> */}
              {buyTradeAdvertisement.status === 'Initiated' && <div className='flex mxc'><Converter amount={buyTradeAdvertisement.amount} onSubmit={this.sellerCreatesPurchaseRequest.bind(this)}
                onEtherAmountChange={this.onEtherAmountChange.bind(this)} onFiatAmountChange={this.onFiatAmountChange} currency={this.props.user.currency} price={price} country={buyer.profile.country}/></div>}
                {buyTradeAdvertisement.status !== 'Initiated' && buyTradeAdvertisement.sellerUid !== this.props.user.data.uid && <h2 className='pv1 tc'>Sorry, looks like this order was already accepted.</h2>}
                {buyTradeAdvertisement.status !== 'Initiated' && buyTradeAdvertisement.sellerUid === this.props.user.data.uid && <h2 className='pv1 tc'>Please accept the MetaMask transaction.</h2>}
            </div>
          </div>
          <div>
            <div>
              <div className='w-50 mt5'>
                <p className='b tc measure'>Terms of Trade</p>
                <p className='pv1 measure'>
                {buyTradeAdvertisement.termsOfTrade}
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
