import React, { Component } from 'react'

import AwaitingEscrow from '../layouts/AwaitingEscrow.js'
import InEscrow from '../layouts/InEscrow.js'
import PaymentConfirmed from '../layouts/PaymentConfirmed.js'
import EtherReleased from '../layouts/EtherReleased.js'
import CancelTradeConfirmModal from './../../generic-components/metamaskmodal/CancelTradeConfirmModal'


import Dot from '../../images/svgReactComponents/Dot.js'

class ActiveBuyOrder extends Component {
  constructor (props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      user: this.props.user,
      buyOrderDetail: this.props.buyOrderDetail,
      params: this.props.params,
      uid: this.props.uid,
      sendEtherState: this.props.sendEtherState,
      cancelTradeState: this.props.cancelTradeState
    }
  }

  componentWillMount () {
    console.log('activebuyorder: in component will mount')
    console.log('uid: ' + this.props.uid)
    this.props.onBeforeComponentLoad(this.props.params.orderId)
  }

  componentWillUnmount () {
    console.log('activebuyorder: in component will unmount')
  }

  // createContract(amount, buyerAddress, web3) {
  //   this.props.createBuyOrder(amount, buyerAddress, web3)
  // }

  resetEtherState() {
    this.props.resetEtherState();
  }

  resetCancelState() {
    this.props.resetCancelState();
  }

  removeCancelModal (e) {
    if (this.props.cancelTradeState !== 'confirmed' && e.target.classList.contains('bg-black-80')) {
      this.props.resetCancelState()
    }
  }

  sendEther () {
    this.props.sendEther(
      this.props.buyOrderDetail.buyOrder,
      this.props.buyOrderDetail.buyOrder.contractAddress,
      this.props.buyOrderDetail.buyOrder.orderId,
      this.props.uid,
      this.props.web3.web3)
  }

  confirmPayment () {
    this.props.confirmPayment(this.props.buyOrderDetail.buyOrder, this.props.buyOrderDetail.buyOrder.orderId)
  }

  releaseEther () {
    this.props.releaseEther(this.props.buyOrderDetail.buyOrder,
      this.props.buyOrderDetail.buyOrder.contractAddress,
      this.props.buyOrderDetail.buyOrder.orderId,
      this.props.web3.web3,
      this.props.buyOrderDetail.buyOrder.buyerUid,
      this.props.buyOrderDetail.buyOrder.sellerUid)
  }

  cancelTrade () {
    if(this.props.cancelTradeState === 'init') {
      this.props.setCancelState();
    } else if (this.props.cancelTradeState === 'cancelling') {
      if(this.props.buyOrderDetail.buyOrder.status === 'Awaiting Escrow' || this.props.buyOrderDetail.buyOrder.status === 'In Escrow') {
        this.props.cancelTrade(this.props.buyOrderDetail.buyOrder.orderId, this.props.user.data.uid);
      }
    }
  }

  cancelTradeEscrow () {

  }

  render () {
    const progress_maps = {
      'Initiated': [
        { status: '', label: <Dot />, text: 'Awaiting Seller' },
        { status: '', label: '', text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Awaiting Escrow': [
        { status: 'active', label: <Dot />, text: 'Awaiting Escrow' },
        { status: '', label: '', text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'In Escrow': [
        { status: 'completed', label: '', text: 'Escrow Sent' },
        { status: 'active', label: <Dot />, text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Payment Confirmed': [
        { status: 'completed', label: '', text: 'Escrow Sent' },
        { status: 'completed', label: '', text: 'Payment Confirmed' },
        { status: 'active', label: <Dot />, text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Ether Released': [
        { status: 'completed', label: '', text: 'Escrow Sent' },
        { status: 'completed', label: '', text: 'Payment Confirmed' },
        { status: 'completed', label: '', text: 'Ether Released' },
        { status: 'completed', label: '', text: 'All Done' }
      ]
    }

    var status = 'getting status....'
    var buyOrder, currentStep, viewerRole
    if (this.props.buyOrderDetail.buyOrder) {
      buyOrder = this.props.buyOrderDetail.buyOrder

      if (buyOrder.buyerUid === this.props.uid) {
        viewerRole = 'buyer'
      } else if (buyOrder.sellerUid === this.props.uid) {
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

      status = buyOrder['status']

      var tradeFlowComponents = {
        'Initiated': <AwaitingEscrow
          step='Awaiting Escrow'
          progress_map={progress_maps['Awaiting Escrow']}
          viewerRole={viewerRole} contractAddress={buyOrder.contractAddress} sendEther={this.sendEther.bind(this)}
          tradeId={this.props.params.orderId}
          buyerId={this.props.buyOrderDetail.buyOrder.buyerUid}
          sellerId={this.props.buyOrderDetail.buyOrder.sellerUid}
          order={this.props.buyOrderDetail.buyOrder} />,

        'Awaiting Escrow': <AwaitingEscrow
          step='Awaiting Escrow'
          progress_map={progress_maps['Awaiting Escrow']}
          viewerRole={viewerRole} contractAddress={buyOrder.contractAddress} sendEther={this.sendEther.bind(this)}
          sendEtherState={this.props.sendEtherState}
          resetEtherState={this.resetEtherState.bind(this)}
          resetCancelState={this.resetCancelState.bind(this)}
          cancelTrade={this.cancelTrade.bind(this)}
          tradeId={this.props.params.orderId}
          buyerId={this.props.buyOrderDetail.buyOrder.buyerUid}
          sellerId={this.props.buyOrderDetail.buyOrder.sellerUid}
          order={this.props.buyOrderDetail.buyOrder} />,

        'In Escrow': <InEscrow
          step='In Escrow'
          progress_map={progress_maps['In Escrow']} viewerRole={viewerRole} confirmPayment={this.confirmPayment.bind(this)}
          resetCancelState={this.resetCancelState.bind(this)}
          cancelTrade={this.cancelTrade.bind(this)}
          order={this.props.buyOrderDetail.buyOrder}/>,
        'Payment Confirmed': <PaymentConfirmed
          step='Payment Confirmed'
          progress_map={progress_maps['Payment Confirmed']} viewerRole={viewerRole} releaseEther={this.releaseEther.bind(this)}
          sendEtherState={this.props.sendEtherState}
          resetEtherState={this.resetEtherState.bind(this)}
          tradeId={this.props.params.orderId}
          buyerId={this.props.buyOrderDetail.buyOrder.buyerUid}
          sellerId={this.props.buyOrderDetail.buyOrder.sellerUid}
          order={this.props.buyOrderDetail.buyOrder} />,
        'Ether Released': <EtherReleased
          step='Ether Released'
          progress_map={progress_maps['Ether Released']} viewerRole={viewerRole}
          tradeId={this.props.params.orderId}
          buyerId={this.props.buyOrderDetail.buyOrder.buyerUid}
          sellerId={this.props.buyOrderDetail.buyOrder.sellerUid}
          order={this.props.buyOrderDetail.buyOrder} />
      }

      currentStep = tradeFlowComponents[status]

      return (
        <section className='activeTrade'>
          {currentStep}
          {this.props.cancelTradeState === 'cancelling' && <CancelTradeConfirmModal close={this.removeCancelModal.bind(this)} cancelTrade={this.cancelTrade.bind(this)}/>}
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

export default ActiveBuyOrder
