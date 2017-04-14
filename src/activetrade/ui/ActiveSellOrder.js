import React, { Component } from 'react'

import Confirmation from '../layouts/Confirmation.js'
import Payment from '../layouts/Payment.js'
import Release from '../layouts/Release.js'
import Dot from '../../images/svgReactComponents/Dot.js';


class ActiveBuyOrder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      sellOrderDetail: this.props.sellOrderDetail,
      params: this.props.params,
      uid: this.props.uid
    }
  }

  componentWillMount(){
    console.log("activesellorder: in component will mount")
    console.log('uid: ' + this.props.uid)
    this.props.onBeforeComponentLoad(this.props.params.orderId)
  }

  componentWillUnmount() {
    console.log('activesellorder: in component will unmount')
  }

  confirmTrade() {
    this.props.confirmTrade(this.props.sellOrderDetail.sellOrder.contractAddress,
                            this.props.sellOrderDetail.sellOrder.requests[this.props.params.requestId].buyerAddress,
                            this.props.sellOrderDetail.sellOrder.orderId,
                            this.props.params.requestId,
                            this.props.sellOrderDetail.sellOrder.requests[this.props.params.requestId].amount,
                            this.props.web3.web3);
  }

  confirmPayment() {
    this.props.confirmPayment(this.props.sellOrderDetail.sellOrder.orderId, this.props.params.requestId);
  }

  releaseEther() {
    this.props.releaseEther(this.props.sellOrderDetail.sellOrder.contractAddress,
                            this.props.sellOrderDetail.sellOrder.requests[this.props.params.requestId].buyerAddress,
                            this.props.sellOrderDetail.sellOrder.orderId,
                            this.props.params.requestId,
                            this.props.web3.web3);
  }

  // createContract(amount, sellerAddress, web3) {
  //   this.props.createBuyOrder(amount, sellerAddress, web3)
  // }

  render() {

    const progress_maps = {
      'Awaiting Seller Confirmation': [
        { status: 'active', label: <Dot/>, text: 'Awaiting Seller Confirmation' },
        { status: '', label: '', text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Awaiting Payment': [
        { status: 'completed', label: '', text: 'Seller Confirmed Transaction' },
        { status: 'active', label: <Dot/>, text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Awaiting Release': [
        { status: 'completed', label: '', text: 'Seller Confirmed Transaction' },
        { status: 'completed', label: '', text: 'Awaiting Payment' },
        { status: 'active', label: <Dot/>, text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Ether Released': [
        { status: 'completed', label: '', text: 'Seller Confirmed Transaction' },
        { status: 'completed', label: '', text: 'Awaiting Payment' },
        { status: 'completed', label: '', text: 'Awaiting Release' },
        { status: 'completed', label: '', text: 'All Done' }
      ]
    }

    var status = 'getting status....'
    var sellOrder, request, currentStep, viewerRole
    console.log(this.props);
    if(this.props.sellOrderDetail.sellOrder) {
      sellOrder = this.props.sellOrderDetail.sellOrder

      console.log('sellerUid')
      console.log(sellOrder.sellerUid)
      console.log('user uid')
      console.log(this.props.uid)

      request = sellOrder.requests[this.props.params.requestId];

      if(sellOrder.sellerUid === this.props.uid) {
        viewerRole = 'seller'
      } else if (this.props.params.requestId === this.props.uid) {
        viewerRole = 'buyer'
      } else {
        return (
          <section className="activeTrade">
            <div className="container">
              <div className="pure-g">
                <div className="pure-u-1">
                  Access Denied
                </div>
              </div>
            </div>
          </section>
        )
      }

      status = request['status']

      var tradeFlowComponents = {
        "Awaiting Seller Confirmation": <Confirmation viewerRole={viewerRole} confirmTrade={this.confirmTrade.bind(this)}/>,
        "Awaiting Payment": <Payment viewerRole={viewerRole} confirmPayment={this.confirmPayment.bind(this)}/>,
        "Awaiting Release": <Release viewerRole={viewerRole} releaseEther={this.releaseEther.bind(this)}/>
      }

      currentStep = tradeFlowComponents[status];
      console.log('status:' + status);
      console.log('currentStep: ' + currentStep);

      return(
        <section className="activeTrade">
                {currentStep}
        </section>
      )
    }
    return(
      <section className="activeTrade">
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1">
              {status}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ActiveBuyOrder
