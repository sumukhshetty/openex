// ISSUE-231-53: change file name from ActiveSellOrder to ActiveTradeOrder
import React, { Component } from 'react'

import Confirmation from './../layouts/Confirmation.js'
import Payment from './../layouts/Payment.js'
import Release from './../layouts/Release.js'
import AllDone from './../layouts/AllDone.js'
import Disputed from './../layouts/Disputed.js'
import Canceled from './../layouts/Canceled.js'
import Dot from './../../images/svgReactComponents/Dot.js'

class ActiveTrade extends Component {

  componentWillMount () {
    this.props.onBeforeComponentLoad(this.props.purchaserequests, this.props.purchaseRequestId, this.props.users)
  }

  componentWillUnmount () {
    console.log("ui.ActiveTrade.componentWillUnmount")
    this.props.clearState()
  }

  sellerConfirmsTrade () {
    // TODO web3 stuff
    this.props.sellerConfirmsTrade(this.props.seller.data, this.props.activetrade.data, this.props.purchaseRequestId)
  }
  buyerConfirmsPayment () {
    this.props.buyerConfirmsPayment(this.props.buyer.data, this.props.activetrade.data, this.props.purchaseRequestId) 
  }

  sellerReleasesEther () {
    // TODO web3 stuff
    this.props.sellerReleasesEther(this.props.seller.data, this.props.activetrade.data, this.props.purchaseRequestId)
  }
  sellerCancelsTrade () {
    this.props.sellerCancelsTrade(this.props.seller.data, this.props.activetrade.data, this.props.purchaseRequestId)
  }
  buyerCancelsTrade () {
    this.props.buyerCancelsTrade(this.props.buyer.data, this.props.activetrade.data, this.props.purchaseRequestId)
  }
  buyerRaisesDispute () {
    this.props.buyerRaisesDispute(this.props.buyer.data, this.props.activetrade.data, this.props.purchaseRequestId)
  }
  sellerRaisesDispute () {
    this.props.sellerRaisesDispute(this.props.seller.data, this.props.activetrade.data, this.props.purchaseRequestId)
  }
  arbiterVotesForSeller () {
    // TODO web3 stuff
    this.props.arbiterVotesForSeller(this.props.seller.data, this.props.arbiter, this.props.activetrade, this.props.purchaseRequestId)
  }
  arbiterVotesForBuyer () {
    // TODO web3 stuff
    this.props.arbiterVotesForBuyer(this.props.buyer.data, this.props.arbiter.data, this.props.activetrade.data, this.props.purchaseRequestId)
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
      ],
      'Seller Canceled Trade': [
        { status: 'active', label: <Dot />, text: 'Seller Canceled Trade' },
        { status: '', label: '', text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Buyer Canceled Trade': [
        { status: 'active', label: <Dot />, text: 'Buyer Canceled Trade' },
        { status: '', label: '', text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ]
    }

    var status = 'getting status....'
    var activetrade, currentStep, viewerRole
    if (this.props.activetrade.data) {
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
          activetrade={activetrade}
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
          activetrade={activetrade} 
          buyer={this.props.buyer} 
          buyerRaisesDispute={this.buyerRaisesDispute.bind(this)} 
          confirmPayment={this.buyerConfirmsPayment.bind(this)} 
          progress_map={progress_maps[status]} 
          purchaseRequestId={this.props.purchaseRequestId} 
          seller={this.props.seller} 
          sellerRaisesDispute={this.sellerRaisesDispute.bind(this)} 
          step={status} 
          viewerRole={viewerRole} 
          />,
        'Awaiting Release': <Release
          activetrade={activetrade} 
          buyer={this.props.buyer}
          buyerRaisesDispute={this.buyerRaisesDispute.bind(this)}
          progress_map={progress_maps[status]} 
          purchaseRequestId={this.props.purchaseRequestId}
          releaseEther={this.sellerReleasesEther.bind(this)} 
          resetEtherState={this.resetEtherState.bind(this)}
          seller={this.props.seller}
          sellerRaisesDispute={this.sellerRaisesDispute.bind(this)}
          sendEtherState={this.props.sendEtherState}
          step={status}
          viewerRole={viewerRole}
          />,
        'All Done': <AllDone
          activetrade={activetrade} 
          buyer={this.props.buyer}
          buyerRatesSeller={this.props.buyerRatesSeller}
          seller={this.props.seller}
          sellerRatesBuyer={this.props.sellerRatesBuyer}
          progress_map={progress_maps[status]} 
          purchaseRequestId={this.props.purchaseRequestId}
          step={status}
          viewerRole={viewerRole}
          />,
        'Seller Canceled Trade': <Canceled
          activetrade={activetrade} 
          viewerRole={viewerRole}
          progress_map={progress_maps[status]} 
          purchaseRequestId={this.props.purchaseRequestId}
          step={status}
          />,
        'Buyer Canceled Trade':<Canceled
          activetrade={activetrade} 
          viewerRole={viewerRole}
          progress_map={progress_maps[status]} 
          purchaseRequestId={this.props.purchaseRequestId}
          step={status}
          />
/*          
        'Trade Disputed': <Disputed
          activetrade={activetrade} 
          progress_map={progress_maps[status]} 
          viewerRole={viewerRole}
         />*/
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
