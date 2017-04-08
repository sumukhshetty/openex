import React, { Component } from 'react'

import ActiveTradeInfo from '../layouts/ActiveTradeInfo'
import ActiveTradeProgress from '../layouts/ActiveTradeProgress'
import StepNote from '../layouts/StepNote';
import BuyerStepNote from './BuyerStepNote';
import SellerStepNote from './SellerStepNote';


import MakePaymentButton from '../layouts/MakePaymentButton'
import ChatMessages from '../layouts/ChatMessages'
import NewChatMessage from '../layouts/NewChatMessage'
import TradeFeedbackContainer from './../../tradefeedback/TradeFeedbackContainer'
import ReleaseEther from './../../releaseether/ReleaseEther'
import DisputeTrade from './../../disputetrade/DisputeTrade'
import CancelTrade from './../../canceltrade/CancelTrade'

class ActiveBuyOrder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3,
      buyOrderDetail: this.props.buyOrderDetail,
      params: this.props.params,
      uid: this.props.uid
    }
  }

  componentWillMount(){
    console.log("activebuyorder: in component will mount");
    console.log('uid: ' + this.props.uid);
    this.props.onBeforeComponentLoad(this.props.params.orderId);
  }

  componentWillUnmount() {
    console.log('activebuyorder: in component will unmount');
  }

  // createContract(amount, buyerAddress, web3) {
  //   this.props.createBuyOrder(amount, buyerAddress, web3);
  // }

  render() {

    const progress_maps = {
      'Initiated': [
        { status: '', label: '', text: 'Escrow' },
        { status: '', label: '', text: 'Payment' },
        { status: '', label: '', text: 'Ether Released' }
      ],
      'Contract Created': [
        { status: 'active', label: '', text: 'Escrow' },
        { status: '', label: '', text: 'Payment' },
        { status: '', label: '', text: 'Ether Released' }
      ],
      'In Escrow': [
        { status: 'completed', label: '', text: 'Escrow' },
        { status: 'active', label: '', text: 'Payment' },
        { status: '', label: '', text: 'Ether Released' }
      ],
      'Payment Confirmed': [
        { status: 'completed', label: '', text: 'Escrow' },
        { status: 'completed', label: '', text: 'Payment' },
        { status: 'active', label: '', text: 'Ether Released' }
      ],
      'Ether Released': [
        { status: 'completed', label: '', text: 'Escrow' },
        { status: 'completed', label: '', text: 'Payment' },
        { status: 'completed', label: '', text: 'Ether Released' }
      ]
    }

    var status = 'getting status....';
    var buyOrder, tradeProgress, stepNote, makePaymentButton, viewerRole, releaseEther, tradeFeedback, sendEtherButton;
    if(this.props.buyOrderDetail.buyOrder) {
      buyOrder = this.props.buyOrderDetail.buyOrder;

      console.log('buyerUid');
      console.log(buyOrder.buyerUid);
      console.log('sellerUid');
      console.log(buyOrder.sellerUid);
      console.log('user uid');
      console.log(this.props.uid);
      if(buyOrder.buyerUid === this.props.uid) {
        viewerRole = 'buyer';
      } else if (buyOrder.sellerUid === this.props.uid) {
        viewerRole = 'seller';
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

      status = buyOrder['status'];
      tradeProgress = <ActiveTradeProgress progress_map={progress_maps[status]} />

      stepNote = (viewerRole === 'buyer') ? <BuyerStepNote step={status} contractAddress={buyOrder.contractAddress} /> :
                                            <SellerStepNote step={status} contractAddress={buyOrder.contractAddress} />

      if(viewerRole === 'seller' && status === 'Contract Created')
        sendEtherButton = <button onClick={()=>this.props.sendEther(buyOrder.contractAddress, buyOrder.orderId, this.props.web3.web3)}>Send Ether</button>

      if(viewerRole === 'buyer' && status === 'In Escrow')
        makePaymentButton = <button onClick={()=>this.props.confirmPayment(buyOrder.orderId)}>Confirm Payment</button>

      if(viewerRole === 'seller' && status === 'Payment Confirmed')
        releaseEther = <button onClick={()=>this.props.releaseEther(buyOrder.contractAddress, buyOrder.orderId, this.props.web3.web3)}>Release Ether</button>

      if(status === 'Ether Released')
        tradeFeedback = <TradeFeedbackContainer />
    }

    return(
      <section className="activeTrade">
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1">
              <ActiveTradeInfo />
              {tradeProgress}
              {stepNote}
              {sendEtherButton}
              {makePaymentButton}
              {releaseEther}
              {tradeFeedback}
              {/* <MakePaymentButton />
              <ChatMessages />
              <NewChatMessage />
              <ReleaseEther />
              <DisputeTrade />
              <TradeFeedbackContainer /> */}
              <CancelTrade />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ActiveBuyOrder
