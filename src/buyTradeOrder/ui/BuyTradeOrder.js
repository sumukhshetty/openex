import React, { Component } from 'react';
import Converter from '../ui/Converter';
import Star from '../../images/Star';

export default class BuyTradeOrder extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: this.props.user,
      sellOrderDetail: this.props.sellOrderDetail,
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
    console.log('trade request handled');
  }

  handleConversion () {
    console.log('conversion handled');
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
                  <td>{this.state.method}</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>User</td>
                  <td>{this.state.buyingFrom} ({this.state.rating}<Star className='dib v-mid pb1' />)</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>Trade Limits</td>
                  <td>{this.state.minLimit}- {this.state.maxLimit} {this.state.currency}</td>
                </tr>
                <tr>
                  <td className='w4 pv2'>Location</td>
                  <td>{this.state.location}</td>
                </tr>
              </table>
            </div>
            <div className='w-50' >
              <h2 className='pv1 tc'>How much do you wish to buy?</h2>
              <div className='flex mxc'><Converter handleTradeRequest={this.handleTradeRequest}
                handleConversion={this.handleConversion} /></div>
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
