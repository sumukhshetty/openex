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

    const progress_map = [
      { status: 'completed', label: '', text: 'Escrow' },
      { status: 'active', label: '', text: 'Payment' },
      { status: '', label: '', text: 'Ether Released' }
    ]
    const step = "payment";
    // NOTE / TODO: above variables hold mock data

    var status = 'getting status....';
    if(this.props.buyOrderDetail.buyOrder) {
      status = this.props.buyOrderDetail.buyOrder['status'];
    }

    return(
      <section className="activeTrade">
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1">
            {status}
              <ActiveTradeInfo />
              <ActiveTradeProgress progress_map={progress_map} />
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
