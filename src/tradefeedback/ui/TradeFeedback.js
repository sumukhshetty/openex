import React, { Component } from 'react'

import TrustButton from './../../trust/layouts/TrustButton'
import BlockButton from './../../block/layouts/BlockButton'
import {Rating} from 'rebass'

class TradeFeedback extends Component {
  constructor (props) {
    super(props)
    this.clickStar = this.clickStar.bind(this)
  }

  componentWillMount () {
    this.props.onBeforeComponentLoad(this.props.activetrade, this.props.purchaseRequestId, this.props.viewerRole)
  }

  componentWillUnmount () {
    this.props.onBeforeComponentUnmount()
  }

  clickStar (rating) {
    var rater = this.props.user.data.uid
    if (!this.props.tradeFeedback.data) {
      switch (rater) {
        case (this.props.activetrade.sellerUid):
          this.props.sellerRatesBuyer(rating, this.props.purchaseRequestId, this.props.activetrade)
          break

        case (this.props.activetrade.buyerUid):
          this.props.buyerRatesSeller(rating, this.props.purchaseRequestId, this.props.activetrade)
      } 
    } 
  }
  render () {
    var _rating
    if (this.props.tradeFeedback.data){
      _rating = this.props.tradeFeedback.data
    } else {
      _rating = 0
    }
    return (
      <div className='measure pv4'>
        <p className='tc flarge b'>
          How would you rate this transaction?
        </p>
        <div className='flex col cxc' >
          <Rating
            color='gold'
            value={_rating}
            onClick={(e) => this.clickStar(e)}
            style={{fontSize:'2.5em'}}
          />
        </div>
        <div className='flex col cxc'>
{/*          <TrustButton />
          <BlockButton />*/}
        </div>
      </div>
    )
  }
}

export default TradeFeedback
