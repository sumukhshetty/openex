import React, { Component } from 'react';
import Converter from '../ui/Converter';
import Star from '../../images/Star';

export default class BuyTradeOrder extends Component {
  constructor (props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      user: this.props.user,
      sellOrderDetail: this.props.sellOrderDetail,
      requestAmount: 0,
      method: 'UPI',
      buyingFrom: 'Victoria Padilla',
      rating: 4.5,
      price: 1203,
      minLimit: 1000,
      maxLimit: 200000,
      currency: 'INR',
      location: 'India'
    };
    this.handleConversion = this.handleConversion.bind(this);
    this.handleTradeRequest = this.handleTradeRequest.bind(this);
  }

  handleTradeRequest (e) {
    e.preventDefault();
    this.props.requestEther(this.state.requestAmount, this.props.uid, this.props.params.orderId, this.props.web3.web3);
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

  componentWillMount(){
    this.props.onBeforeComponentLoad(this.props.params.orderId);
  }

  render () {
    var sellOrder = this.props.sellOrderDetail.sellOrder;
    var userInfo = this.props.user.userInfo;
    if(sellOrder && userInfo) {
    return (
      <div className='w-100 bg-smoke vh-100'>
        <div className='w-75 center pv3'>
          <h1 className='pv1'>Buy ether using {sellOrder.paymentMethod} from {userInfo.username}</h1>
          <div className='flex mxb w-100 cxc'>
            <div className='w-50'>
              <table className='lh-copy'>
                <tr>
                  <td className='w4 pv2'>Price</td>
                  <td className='green'>{this.state.price} INR/ETH</td>
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
            <div className='w-50' >
              <h2 className='pv1 tc'>How much do you wish to buy?</h2>
              <div className='flex mxc'><Converter handleTradeRequest={this.handleTradeRequest.bind(this)}
                onEtherAmountChange={this.onEtherAmountChange.bind(this)} onFiatAmountChange={this.onFiatAmountChange}/></div>
            </div>
          </div>
          <div>
            <div>
              <div className='w-50 mt5'>
                <p className='b tc measure'>Terms of Trade</p>
                <p className='pv1 measure'>
                Create an ether trade advertisment if you plan to trade ether regularly. We recommend clicking on buy or sell if you want to trade quicker.
                Creating an advertisement is FREE. Sellers have to pay gas fee for uploading a sell contract.
                Before setting up your advertisemnt  please read though our terms of service and the online sale advertisement guide
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
