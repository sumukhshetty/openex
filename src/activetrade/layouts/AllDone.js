import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/containers/ChatBox'
import TradeFeedback from './../../tradefeedback/layouts/TradeFeedback'

class AllDone extends Component {
  render() {
    const progressMap = [
      { status: 'completed', label: '', text: 'Seller Confirmed Transaction' },
      { status: 'completed', label: '', text: 'Payment Received' },
      { status: 'completed', label: '', text: 'Ether Released' },
      { status: 'completed', label: '', text: 'All Done' }
    ]

    return (
      <section className="bg-smoke">
        <div className="w-75 center mb4">
          <ActiveTradeInfo
            activetrade={this.props.activetrade}
            viewerRole={this.props.viewerRole}
            displayId={this.props.purchaseRequestId.slice(1, 6)}
          />
          <Progress progress_map={progressMap} />
          <div className="flex">
            <ChatBox
              tradeId={this.props.purchaseRequestId}
              sellerId={this.props.activetrade.sellerUid}
              buyerId={this.props.activetrade.buyerUid}
              purchaseRequest={this.props.activetrade}
            />
            <div className="w-50 mh3 mb3">
              <TradeFeedback
                purchaseRequestId={this.props.purchaseRequestId}
                activetrade={this.props.activetrade}
                sellerRatesBuyer={this.props.sellerRatesBuyer}
                buyerRatesSeller={this.props.buyerRatesSeller}
                viewerRole={this.props.viewerRole}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default AllDone
