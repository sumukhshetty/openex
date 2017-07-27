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
    this.props.onBeforeComponentLoad(this.props.purchaserequests,
      this.props.purchaseRequestId, this.props.users, this.props.user)
  }

  componentWillUnmount () {
    if (this.props.activetrade.data.status === 'All Done' &&  !this.props.activetrade.data.postProcessingCompleted){
      this.tradePostProcessing()
    }
    this.props.clearState()
  }

  sellerConfirmsTrade () {
    this.props.sellerConfirmsTrade(this.props.seller.data, this.props.buyer.data, this.props.activetrade.data, this.props.purchaseRequestId, this.props.web3.data, this.props.sellerInterface, this.props.orderDB, this.props.orderBook)
  }
  buyerConfirmsPayment () {
    this.props.buyerConfirmsPayment(this.props.buyer.data, this.props.seller.data,this.props.activetrade.data, this.props.purchaseRequestId)
  }

  sellerReleasesEther () {
    this.props.sellerReleasesEther(this.props.seller.data, this.props.buyer.data, this.props.activetrade.data, this.props.purchaseRequestId, this.props.web3.data, this.props.sellerInterface, this.props.orderBook)
  }
  sellerCancelsTrade () {
    this.props.sellerCancelsTrade(this.props.seller.data, this.props.buyer.data, this.props.activetrade.data, this.props.purchaseRequestId)
  }
  buyerCancelsTrade () {
    this.props.buyerCancelsTrade(this.props.seller.data, this.props.buyer.data,this.props.activetrade.data, this.props.purchaseRequestId)
  }
  buyerRaisesDispute () {
    this.props.buyerRaisesDispute(this.props.seller.data, this.props.buyer.data, this.props.activetrade.data, this.props.purchaseRequestId)
  }
  sellerRaisesDispute () {
    this.props.sellerRaisesDispute(this.props.seller.data, this.props.buyer.data, this.props.activetrade.data, this.props.purchaseRequestId)
  }
  arbiterReleasesToSeller () {
    console.log("ActiveTrade.arbiterReleasesToSeller")
    this.props.arbiterReleasesToSeller(this.props.seller.data, this.props.buyer.data,this.props.user, this.props.activetrade.data, this.props.purchaseRequestId, this.props.web3.data)
  }
  arbiterReleasesToBuyer () {
    this.props.arbiterReleasesToBuyer(this.props.buyer.data, this.props.seller.data, this.props.user, this.props.activetrade.data, this.props.purchaseRequestId, this.props.web3.data)
  }
  tradePostProcessing () {
    this.props.tradePostProcessing(this.props.user, this.props.activetrade.data, this.props.purchaseRequestId, this.props.users)
  }
  createSellerInterfaceContract () {
    console.log('ui.ActiveTrade.createSellerInterfaceContract')
    this.props.createSellerInterfaceContract(this.props.web3.data, this.props.sellerInterfaceFactory, this.props.user)
  }
  resetEtherState() {
    this.props.resetEtherState();
  }
  assignArbiter () {
    console.log('ui.ActiveTrade.assignArbiter')
    this.props.assignArbiter(this.props.user, this.props.seller.data, this.props.buyer.data, this.props.activetrade.data, this.props.purchaseRequestId, this.props.web3.data)
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
      ],
      'Seller Raised Dispute': [
        { status: 'active', label: <Dot />, text: 'Seller Raised Dispute' },
        { status: '', label: '', text: 'Awaiting Payment' },
        { status: '', label: '', text: 'Awaiting Release' },
        { status: '', label: '', text: 'All Done' }
      ],
      'Buyer Raised Dispute': [
        { status: 'active', label: <Dot />, text: 'Buyer Raised Dispute' },
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
        if (this.props.user.profile.isAdmin){
          viewerRole = 'arbiter'
        }
      }

      status = activetrade['status']
      var tradeFlowComponents = {
        'Awaiting Seller Confirmation': <Confirmation
          web3={this.props.web3.data}
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
          sellerAddsEther={this.props.sellerAddsEther}
          createSellerInterfaceContract={this.createSellerInterfaceContract.bind(this)}
          step={status}
          viewerRole={viewerRole}
          txhash={this.props.txhash.data}
          sellerInterface={this.props.sellerInterface.data}
          confirmTradeButtonIsDisabled={this.props.activetrade.confirmTradeButtonIsDisabled}
          confirmTradeButtonColor={this.props.activetrade.confirmTradeButtonColor}
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
          txhash={this.props.txhash.data}
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
          />,
        'Seller Raised Dispute': <Disputed
          activetrade={activetrade}
          progress_map={progress_maps[status]}
          viewerRole={viewerRole}
          step={status}
          releaseEther={this.sellerReleasesEther.bind(this)}
          purchaseRequestId={this.props.purchaseRequestId}
          releaseToBuyer={this.arbiterReleasesToBuyer.bind(this)}
          releaseToSeller={this.arbiterReleasesToSeller.bind(this)}
          assignArbiter={this.assignArbiter.bind(this)}
          />,
        'Buyer Raised Dispute': <Disputed
          activetrade={activetrade}
          progress_map={progress_maps[status]}
          viewerRole={viewerRole}
          step={status}
          releaseEther={this.sellerReleasesEther.bind(this)}
          purchaseRequestId={this.props.purchaseRequestId}
          releaseToBuyer={this.arbiterReleasesToBuyer.bind(this)}
          releaseToSeller={this.arbiterReleasesToSeller.bind(this)}
          assignArbiter={this.assignArbiter.bind(this)}
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
