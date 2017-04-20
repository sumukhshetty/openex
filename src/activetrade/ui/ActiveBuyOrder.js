import React, { Component } from 'react'

import AwaitingEscrow from '../layouts/AwaitingEscrow.js'
import InEscrow from '../layouts/InEscrow.js'
import PaymentConfirmed from '../layouts/PaymentConfirmed.js'
import EtherReleased from '../layouts/EtherReleased.js'

import Dot from '../../images/svgReactComponents/Dot.js';

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

  sendEther() {
    this.props.sendEther(this.props.buyOrderDetail.buyOrder.contractAddress, this.props.buyOrderDetail.buyOrder.orderId, this.props.web3.web3);
  }

  confirmPayment() {
    this.props.confirmPayment(this.props.buyOrderDetail.buyOrder.orderId);
  }

  releaseEther() {
    this.props.releaseEther(this.props.buyOrderDetail.buyOrder.contractAddress, this.props.buyOrderDetail.buyOrder.orderId, this.props.web3.web3, this.props.buyOrderDetail.buyOrder.buyerUid, this.props.buyOrderDetail.buyOrder.sellerUid)
  }

  render() {

    const progress_maps = {
      'Initiated': [
        { status: '', label: <Dot/>, text: 'Awaiting Seller' },
        { status: '', label: '', text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Awaiting Escrow': [
        { status: 'active', label: <Dot/>, text: 'Awaiting Escrow' },
        { status: '', label: '', text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'In Escrow': [
        { status: 'completed', label: '', text: 'Escrow Sent' },
        { status: 'active', label: <Dot/>, text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Payment Confirmed': [
        { status: 'completed', label: '', text: 'Escrow Sent' },
        { status: 'completed', label: '', text: 'Payment Confirmed' },
        { status: 'active', label: <Dot/>, text: 'Awaiting Release' },
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

      var tradeFlowComponents = {
        "Awaiting Escrow": <AwaitingEscrow step="Awaiting Escrow" progress_map={progress_maps['Awaiting Escrow']} viewerRole={viewerRole} contractAddress={buyOrder.contractAddress} sendEther={this.sendEther.bind(this)}/>,
        "In Escrow": <InEscrow step="In Escrow" progress_map={progress_maps['In Escrow']} viewerRole={viewerRole} confirmPayment={this.confirmPayment.bind(this)}/>,
        "Payment Confirmed": <PaymentConfirmed step="Payment Confirmed" progress_map={progress_maps['Payment Confirmed']} viewerRole={viewerRole} releaseEther={this.releaseEther.bind(this)}/>,
        "Ether Released": <EtherReleased step="Ether Released" progress_map={progress_maps['Ether Released']} viewerRole={viewerRole} />,
      }

      currentStep = tradeFlowComponents[status];
      console.log('status:' + status);
      console.log('currentStep: ' + currentStep);

      return(
        <section className="activeTrade">
                {currentStep}
        </section>
      )

      // tradeProgress = <Progress progress_map={progress_maps[status]} />
      //
      // stepNote = (viewerRole === 'buyer') ? <BuyerStepNote step={status} contractAddress={buyOrder.contractAddress} /> :
      //                                       <SellerStepNote step={status} contractAddress={buyOrder.contractAddress} />
      //
      // if(viewerRole === 'seller' && status === 'Awaiting Escrow')
      //   sendEtherButton = <button onClick={()=>this.props.sendEther(buyOrder.contractAddress, buyOrder.orderId, this.props.web3.web3)}>Send Ether</button>
      //
      // if(viewerRole === 'buyer' && status === 'Escrow Sent')
      //   makePaymentButton = <button onClick={()=>this.props.confirmPayment(buyOrder.orderId)}>Confirm Payment</button>
      //
      // if(viewerRole === 'seller' && status === 'Payment Confirmed')
      //   releaseEther = <button onClick={()=>this.props.releaseEther(buyOrder.contractAddress, buyOrder.orderId, this.props.web3.web3, buyOrder.buyerUid, buyOrder.sellerUid)}>Release Ether</button>
      //
      // if(status === 'Ether Released')
      //   tradeFeedback = <TradeFeedbackContainer />

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
