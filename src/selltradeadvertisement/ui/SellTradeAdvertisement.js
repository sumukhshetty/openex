import React, { Component } from 'react';
import Converter from '../ui/Converter';
import Star from '../../images/Star';

export default class SellTradeAdvertisement extends Component {
  constructor (props) {
    super(props);

    this.handleConversion = this.handleConversion.bind(this)
    this.createPurchaseRequest = this.createPurchaseRequest.bind(this)
  }

  onComponentWillMount(){
    this.props.sellTradeAdvertisement(this.props.selltradeadvertisements, this.props.sellTradeAdvertisementId, this.props.users)
  }

  onComponentWillUnmount(){
    this.props.clearState()
  }

  createPurchaseRequest(){
    this.props.createPurchaseRequest(this.props.selltradeadvertisement, this.props.seller, this.props.user)
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

  componentWillMount() {
    this.props.onBeforeComponentLoad(this.props.params.orderId);
  }

  render () {
    console.log("SellTradeAdvetisement")
    var sellTradeAdvertisement = this.props.selltradeadvertisement
    var seller = this.props.seller

    if(sellTradeAdvertisement && seller) {
    var price = this.props.etherPrice ? (this.props.etherPrice.data * sellTradeAdvertisement.margin).toFixed(2) : null;
    return (
      <div className='w-100 bg-smoke vh-100'>
        <div className='w-75 center pv3'>
          <h1 className='pv1'>Sell {sellTradeAdvertisement.amount} ether to {seller.profile.username} using {sellTradeAdvertisement.paymentMethod}</h1>
          <div className='flex mxb w-100 cxc'>
            <div className='w-50'>
              <table className='lh-copy'>
                <tr>
                  <td className='w4 pv2'>Price</td>
                  <td className='green'>{price ? price : 'Getting price...'} {this.props.user.currency + '/ETH'}</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>Payment Method</td>
                  <td>{sellTradeAdvertisement.paymentMethod}</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>User</td>
                  <td>{seller.username} ({this.state.rating}<Star className='dib v-mid pb1' />)</td>
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
            <div className='w-50' >
              {/* <h2 className='pv1 tc'>How much do you wish to buy?</h2> */}
              {sellTradeAdvertisement.status === 'Initiated' && <div className='flex mxc'><Converter amount={sellTradeAdvertisement.amount} onSubmit={this.createPurchaseRequest.bind(this)}
                onEtherAmountChange={this.onEtherAmountChange.bind(this)} onFiatAmountChange={this.onFiatAmountChange} currency={this.props.user.currency} price={price} country={seller.country}/></div>}
                {sellTradeAdvertisement.status !== 'Initiated' && sellTradeAdvertisement.sellerUid !== this.props.user.data.uid && <h2 className='pv1 tc'>Sorry, looks like this order was already accepted.</h2>}
                {sellTradeAdvertisement.status !== 'Initiated' && sellTradeAdvertisement.sellerUid === this.props.user.data.uid && <h2 className='pv1 tc'>Please accept the MetaMask transaction.</h2>}
            </div>
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
