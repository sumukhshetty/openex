import React, { Component } from 'react'
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo'
import Progress from '../../generic-components/tradeFlow/Progress'
import ChatBox from '../../chat/components/ChatBox'
import CancelTrade from '../../generic-components/tradeFlow/CancelTrade'
import BuyerStepNote from '../ui/BuyerStepNoteBuy'
import SellerStepNote from '../ui/SellerStepNoteBuy'

import Dot from '../../images/svgReactComponents/Dot.js'
import { Link } from 'react-router'

class ReviewActiveTrade extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveTradeInfo params={this.props.params} />
          <Progress progress_map={this.props.progress_map} />
          <div className='flex'>
            <ChatBox />
            <div className='w-50 ma3'>
              {this.props.viewerRole == 'buyer' &&
                <div>
                  <BuyerStepNote step={this.props.step} />
                  <div className='tc'>
                    <button onClick={this.props.confirmPayment}>
                   Confirm Payment
                 </button>
                  </div>
                </div>
              }
              {this.props.viewerRole == 'seller' &&
              <SellerStepNote step={this.props.step} />}
              <CancelTrade />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ReviewActiveTrade
