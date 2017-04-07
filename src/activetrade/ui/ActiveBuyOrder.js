import React, { Component } from 'react'

import ActiveTradeInfo from '../layouts/ActiveTradeInfo'
import ActiveTradeProgress from '../layouts/ActiveTradeProgress'
import StepNote from '../layouts/StepNote';
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
      params: this.props.params
    }
  }

  componentWillMount(){
    console.log("activebuyorder: in component will mount");
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

    const step = "payment";
    // NOTE / TODO: above variables hold mock data

    var status = 'getting status....';
    var tradeProgress;
    if(this.props.buyOrderDetail.buyOrder) {
      status = this.props.buyOrderDetail.buyOrder['status'];
      tradeProgress = <ActiveTradeProgress progress_map={progress_maps[status]} />
    }

    return(
      <section className="activeTrade">
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1">
              <ActiveTradeInfo />
              {tradeProgress}
              <StepNote step={step} />
              {/* <MakePaymentButton />
              <ChatMessages />
              <NewChatMessage />
              <ReleaseEther />
              <CancelTrade />
              <DisputeTrade />
              <TradeFeedbackContainer /> */}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ActiveBuyOrder
