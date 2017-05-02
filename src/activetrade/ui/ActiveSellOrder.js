import React, { Component } from 'react'

import Confirmation from '../layouts/Confirmation.js'
import Payment from '../layouts/Payment.js'
import Release from '../layouts/Release.js'
import AllDone from '../layouts/AllDone.js'
import Dot from '../../images/svgReactComponents/Dot.js'

class ActiveSellOrder extends Component {
  constructor (props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      user: this.props.user,
      sellOrderDetail: this.props.sellOrderDetail,
      params: this.props.params,
      uid: this.props.uid,
      sendEtherState: this.props.sendEtherState
    }
  }

  componentWillMount () {
    console.log('activesellorder: in component will mount')
    console.log('uid: ' + this.props.uid)
    this.props.onBeforeComponentLoad(this.props.params.requestId)
  }

  componentWillUnmount () {
    console.log('activesellorder: in component will unmount')
  }

  confirmTrade () {
    this.props.confirmTrade(this.props.sellOrderDetail.sellOrder.contractAddress,
                            this.props.sellOrderDetail.sellOrder.buyerAddress,
                            this.props.params.requestId,
                            this.props.sellOrderDetail.sellOrder.amount,
                            this.props.web3.web3)
  }

  confirmPayment () {
    this.props.confirmPayment(this.props.params.requestId)
  }

  releaseEther () {
    this.props.releaseEther(this.props.sellOrderDetail.sellOrder.contractAddress,
                            this.props.sellOrderDetail.sellOrder.buyerAddress,
                            this.props.params.requestId,
                            this.props.sellOrderDetail.sellOrder.buyerUid,
                            this.props.sellOrderDetail.sellOrder.sellerUid,
                            this.props.web3.web3)
  }

  resetEtherState() {
    this.props.resetEtherState();
  }

  // createContract(amount, sellerAddress, web3) {
  //   this.props.createBuyOrder(amount, sellerAddress, web3)
  // }

  render () {
    const progress_maps = {
      'Awaiting Seller Confirmation': [
        { status: 'active', label: <Dot />, text: 'Awaiting Seller Confirmation' },
        { status: '', label: '', text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Awaiting Payment': [
        { status: 'completed', label: '', text: 'Seller Confirmed Transaction' },
        { status: 'active', label: <Dot />, text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Awaiting Release': [
        { status: 'completed', label: '', text: 'Seller Confirmed Transaction' },
        { status: 'completed', label: '', text: 'Buyer Confirmed Payment' },
        { status: 'active', label: <Dot />, text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Ether Released': [
        { status: 'completed', label: '', text: 'Seller Confirmed Transaction' },
        { status: 'completed', label: '', text: 'Buyer Confirmed Payment' },
        { status: 'completed', label: '', text: 'Seller Released Ether' },
        { status: 'completed', label: '', text: 'All Done' }
      ]
    }

    var status = 'getting status....'
    var request, currentStep, viewerRole
    // console.log(this.props)
    if (this.props.sellOrderDetail.sellOrder) {
      request = this.props.sellOrderDetail.sellOrder

      // console.log('buyerUid')
      // console.log(request.buyerUid)
      // console.log('user uid')
      // console.log(this.props.uid)

      if (request.buyerUid === this.props.user.data.uid) {
        viewerRole = 'buyer'
      } else if (request.sellerUid === this.props.user.data.uid) {
        viewerRole = 'seller'
      } else {
        return (
          <section className='activeTrade'>
            <div className='container'>
              <div className='pure-g'>
                <div className='pure-u-1'>
                  Access Denied
                </div>
              </div>
            </div>
          </section>
        )
      }

      status = request['status']

      var tradeFlowComponents = {
        'Awaiting Seller Confirmation': <Confirmation
          step={status}
          progress_map={progress_maps[status]}
          viewerRole={viewerRole} confirmTrade={this.confirmTrade.bind(this)} tradeId={this.props.params.orderId || this.props.params.requestId}
          buyerId={this.props.sellOrderDetail.sellOrder.buyerUid}
          sellerId={this.props.sellOrderDetail.sellOrder.sellerUid}
          sendEtherState={this.props.sendEtherState}
          resetEtherState={this.resetEtherState.bind(this)}
          order={this.props.sellOrderDetail.sellOrder} />,
        'Awaiting Payment': <Payment
          step={status}
          viewerRole={viewerRole}
          progress_map={progress_maps[status]} confirmPayment={this.confirmPayment.bind(this)} tradeId={this.props.params.orderId || this.props.params.requestId}
          buyerId={this.props.sellOrderDetail.sellOrder.buyerUid}
          sellerId={this.props.sellOrderDetail.sellOrder.sellerUid}
          order={this.props.sellOrderDetail.sellOrder} />,
        'Awaiting Release': <Release
          step={status}
          viewerRole={viewerRole}
          progress_map={progress_maps[status]} releaseEther={this.releaseEther.bind(this)} tradeId={this.props.params.orderId || this.props.params.requestId}
          buyerId={this.props.sellOrderDetail.sellOrder.buyerUid}
          sellerId={this.props.sellOrderDetail.sellOrder.sellerUid}
          sendEtherState={this.props.sendEtherState}
          resetEtherState={this.resetEtherState.bind(this)}
          order={this.props.sellOrderDetail.sellOrder} />,
        'All Done': <AllDone
          step={status}
          viewerRole={viewerRole}
          progress_map={progress_maps[status]} tradeId={this.props.params.orderId || this.props.params.requestId}
          buyerId={this.props.sellOrderDetail.sellOrder.buyerUid}
          sellerId={this.props.sellOrderDetail.sellOrder.sellerUid}
          order={this.props.sellOrderDetail.sellOrder} />
      }

      currentStep = tradeFlowComponents[status]
      // console.log('status:' + status)
      // console.log('currentStep: ' + currentStep)

      return (
        <section className='activeTrade'>
          {currentStep}
        </section>
      )
    }
    return (
      <section className='activeTrade'>
        <div className='container'>
          <div className='pure-g'>
            <div className='pure-u-1'>
              {status}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ActiveSellOrder
