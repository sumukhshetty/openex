import React, { Component } from 'react';
import Converter from '../ui/Converter';
import Star from '../../images/Star';

export default class SellTradeOrder extends Component {
  constructor (props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      etherPrice: this.props.etherPrice,
      user: this.props.user,
      buyOrderDetail: this.props.buyOrderDetail,
      rating: 4.5
    };
    this.handleConversion = this.handleConversion.bind(this);
    this.acceptOrder = this.acceptOrder.bind(this);
  }

  acceptOrder (e) {
    console.log("acceptOrder")
    e.preventDefault();
    this.props.acceptOrder(this.props.buyOrderDetail.buyOrder,
      this.props.buyOrderDetail.buyOrder.amount,
      this.props.etherPrice.data,
      this.props.user.data.displayName,
      this.props.buyOrderDetail.buyOrder.buyerAddress,
      this.props.buyOrderDetail.buyOrder.orderId,
      this.props.user.data.uid,
      this.props.buyOrderDetail.buyOrder.buyerUid,
      this.props.web3.web3);
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
    console.log("SellTradeOrder**")
    var buyOrder = this.props.buyOrderDetail.buyOrder;
    console.log(buyOrder)
    var userInfo = this.props.user.userInfo;
    if(buyOrder && userInfo) {
    var price = this.props.etherPrice ? (this.props.etherPrice.data * buyOrder.margin).toFixed(2) : null;
    return (
      <div className='w-100 bg-smoke vh-100'>
        <div className='w-75 center pv3'>
          <h1 className='pv1'>Sell {buyOrder.amount} ether to {userInfo.username} using {buyOrder.paymentMethod}</h1>
          <div className='flex mxb w-100 cxc'>
            <div className='w-50'>
              <table className='lh-copy'>
                <tr>
                  <td className='w4 pv2'>Price</td>
                  <td className='green'>{price ? price : 'Getting price...'} {this.props.user.currency + '/ETH'}</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>Payment Method</td>
                  <td>{buyOrder.paymentMethod}</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>User</td>
                  <td>{userInfo.username} ({this.state.rating}<Star className='dib v-mid pb1' />)</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>Trade Limits</td>
                  <td>{buyOrder.minTransactionLimit}- {buyOrder.maxTransactionLimit} {buyOrder.currency}</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>Location</td>
                  <td>{buyOrder.location}</td>
                </tr>
              </table>
            </div>
            <div className='w-50' >
              {/* <h2 className='pv1 tc'>How much do you wish to buy?</h2> */}
              {buyOrder.status === 'Initiated' && <div className='flex mxc'><Converter amount={buyOrder.amount} onSubmit={this.acceptOrder.bind(this)}
                onEtherAmountChange={this.onEtherAmountChange.bind(this)} onFiatAmountChange={this.onFiatAmountChange} currency={this.props.user.currency} price={price} country={userInfo.country}/></div>}
                {buyOrder.status !== 'Initiated' && buyOrder.sellerUid !== this.props.user.data.uid && <h2 className='pv1 tc'>Sorry, looks like this order was already accepted.</h2>}
                {buyOrder.status !== 'Initiated' && buyOrder.sellerUid === this.props.user.data.uid && <h2 className='pv1 tc'>Please accept the MetaMask transaction.</h2>}
            </div>
          </div>
          <div>
            <div>
              <div className='w-50 mt5'>
                <p className='b tc measure'>Terms of Trade</p>
                <p className='pv1 measure'>
                {buyOrder.termsOfTrade}
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
