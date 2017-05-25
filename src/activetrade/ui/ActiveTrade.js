// ISSUE-231-53: change file name from ActiveSellOrder to ActiveTradeOrder
import React, { Component } from 'react'

import Confirmation from '../layouts/Confirmation.js'
import Payment from '../layouts/Payment.js'
import Release from '../layouts/Release.js'
import AllDone from '../layouts/AllDone.js'
import Disputed from '../layouts/Disputed.js'
import Canceled from '../layouts/Canceled.js'
import Dot from '../../images/svgReactComponents/Dot.js'

class ActiveTrade extends Component {

  componentWillMount () {
    this.props.onBeforeComponentLoad(this.props.activetrade, this.props.purchaseRequestId, this.props.user)
  }

  componentWillUnmount () {
    this.props.clearState()
  }

  sellerConfirmsTrade () {
    // TODO web3 stuff
    this.props.sellerConfirmsTrade(this.props.seller, this.props.activetrade, this.props.purchaseRequestId)
  }
  buyerConfirmsPayment () {
    this.props.buyerConfirmsPayment(this.props.buyer, this.props.activetrade, this.props.purchaseRequestId) 
  }

  sellerReleasesEther () {
    // TODO web3 stuff
    this.props.sellerReleasesEther(this.props.seller, this.props.activetrade, this.props.purchaseRequestId)
  }
  sellerCancelsTrade () {
    this.props.sellerCancelsTrade(this.props.seller, this.props.activetrade, this.props.purchaseRequestId)
  }
  buyerCancelsTrade () {
    this.props.buyerCancelsTrade(this.props.buyer, this.props.activetrade, this.props.purchaseRequestId)
  }
  buyerRaisesDispute () {
    this.props.buyerRaisesDispute(this.props.buyer, this.props.activetrade, this.props.purchaseRequestId)
  }
  sellerRaisesDispute () {
    this.props.sellerRaisesDispute(this.props.seller, this.props.activetrade, this.props.purchaseRequestId)
  }
  arbiterVotesForSeller () {
    // TODO web3 stuff
    this.props.arbiterVotesForSeller(this.props.seller, this.props.arbiter, this.props.activetrade, this.props.purchaseRequestId)
  }
  arbiterVotesForBuyer () {
    // TODO web3 stuff
    this.props.arbiterVotesForBuyer(this.props.buyer, this.props.arbiter, this.props.activetrade, this.props.purchaseRequestId)
  }

  resetEtherState() {
    this.props.resetEtherState();
  }


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
    var activetrade, currentStep, viewerRole
    // console.log(this.props)
    if (this.props.activetrade) {
      activetrade = this.props.activetrade.data

      if (activetrade.buyerUid === this.props.user.data.uid) {
        viewerRole = 'buyer'
      } else if (activetrade.sellerUid === this.props.user.data.uid) {
        viewerRole = 'seller'
      } else {
        viewerRole = 'arbiter'
      }

      status = activetrade['status']
      // TODO add the raisedDispute and canceledTrade components
      var tradeFlowComponents = {
        'Awaiting Seller Confirmation': <Confirmation
          activeTrade={activetrade}
          confirmTrade={this.sellerConfirmsTrade.bind(this)} 
          buyer={this.props.buyer}
          buyerCancelsTrade={this.buyerCancelsTrade.bind(this)}
          progress_map={progress_maps[status]}
          purchaseRequestId={this.props.purchaseRequestId}
          resetEtherState={this.resetEtherState.bind(this)}
          seller={this.props.seller}
          sellerCancelsTrade={this.sellerCancelsTrade.bind(this)}
          sendEtherState={this.props.sendEtherState}
          step={status}
          viewerRole={viewerRole} 
          />,
        'Awaiting Payment': <Payment
          activeTrade={activetrade} 
          buyer={this.props.buyer} 
          buyerRaisesDispute={this.props.buyerRaisesDispute.bind(this)} 
          confirmPayment={this.buyerConfirmsPayment.bind(this)} 
          progress_map={progress_maps[status]} 
          purchaseRequestId={this.props.purchaseRequestId} 
          seller={this.props.seller} 
          sellerRaisesDispute={this.props.sellerRaisesDispute.bind(this)} 
          step={status} 
          viewerRole={viewerRole} 
          />,
        'Awaiting Release': <Release
          activeTrade={activetrade} 
          buyer={this.props.buyer}
          buyerRaisesDispute={this.props.buyerRaisesDispute.bind(this)}
          progress_map={progress_maps[status]} 
          purchaseRequestId={this.props.purchaseRequestId}
          releaseEther={this.sellerReleasesEther.bind(this)} 
          resetEtherState={this.resetEtherState.bind(this)}
          seller={this.props.seller}
          sellerRaisesDispute={this.props.sellerRaisesDispute.bind(this)}
          sendEtherState={this.props.sendEtherState}
          step={status}
          viewerRole={viewerRole}
          />,
        'All Done': <AllDone
          activeTrade={activetrade} 
          buyer={this.props.buyer}
          seller={this.props.seller}
          progress_map={progress_maps[status]} 
          purchaseRequestId={this.props.purchaseRequestId}
          step={status}
          viewerRole={viewerRole}
          />,
        'Trade Canceled': <Canceled
          activeTrade={activetrade} 
          viewerRole={viewerRole}
          />,
        'Trade Disputed': <Disputed
          activeTrade={activetrade} 
          viewerRole={viewerRole}
         />
      }

      currentStep = tradeFlowComponents[status]

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

export default ActiveTrade
