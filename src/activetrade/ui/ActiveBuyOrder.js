import React, { Component } from 'react'

import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'

import BuyerStepNote  from '../../generic-components/tradeFlow/StepNote';
import SellerStepNote  from '../../generic-components/tradeFlow/StepNote';
import TradeFeedbackContainer from '../../generic-components/tradeFlow/TradeFeedback';
import CancelTrade from '../../generic-components/tradeFlow/CancelTrade'

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
    console.log("activebuyorder: in component will mount")
    console.log('uid: ' + this.props.uid)
    this.props.onBeforeComponentLoad(this.props.params.orderId)
  }

  componentWillUnmount() {
    console.log('activebuyorder: in component will unmount')
  }

  // createContract(amount, buyerAddress, web3) {
  //   this.props.createBuyOrder(amount, buyerAddress, web3)
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

    var status = 'getting status....'
    var buyOrder, tradeProgress, stepNote, makePaymentButton, viewerRole, releaseEther, tradeFeedback, sendEtherButton
    if(this.props.buyOrderDetail.buyOrder) {
      buyOrder = this.props.buyOrderDetail.buyOrder

      console.log('buyerUid')
      console.log(buyOrder.buyerUid)
      console.log('sellerUid')
      console.log(buyOrder.sellerUid)
      console.log('user uid')
      console.log(this.props.uid)
      if(buyOrder.buyerUid === this.props.uid) {
        viewerRole = 'buyer'
      } else if (buyOrder.sellerUid === this.props.uid) {
        viewerRole = 'seller'
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

      status = buyOrder['status']
      tradeProgress = <Progress progress_map={progress_maps[status]} />

      stepNote = (viewerRole === 'buyer') ? <BuyerStepNote step={status} contractAddress={buyOrder.contractAddress} /> :
                                            <SellerStepNote step={status} contractAddress={buyOrder.contractAddress} />

      if(viewerRole === 'seller' && status === 'Contract Created')
        sendEtherButton = <button onClick={()=>this.props.sendEther(buyOrder.contractAddress, buyOrder.orderId, this.props.web3.web3)}>Send Ether</button>

      if(viewerRole === 'buyer' && status === 'In Escrow')
        makePaymentButton = <button onClick={()=>this.props.confirmPayment(buyOrder.orderId)}>Confirm Payment</button>

      if(viewerRole === 'seller' && status === 'Payment Confirmed')
        releaseEther = <button onClick={()=>this.props.releaseEther(buyOrder.contractAddress, buyOrder.orderId, this.props.web3.web3, buyOrder.buyerUid, buyOrder.sellerUid)}>Release Ether</button>

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
              <ChatBox />
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
