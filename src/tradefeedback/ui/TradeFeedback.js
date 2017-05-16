import React, { Component } from 'react'
import Star from '../../images/Star.js'
import Block from '../../images/svgReactComponents/Block.js'
import TrustButton from './../../trust/layouts/TrustButton'
import BlockButton from './../../block/layouts/BlockButton'
import {firebaseRef} from './../../index.js'
import {Rating} from 'rebass'

class TradeFeedback extends Component {
  constructor (props) {
    super(props)
    this.clickStar = this.clickStar.bind(this)
  }

  componentWillMount () {
    // console.log('TradeFeedback.componentWillMount')
    // console.log(this.props)
    // console.log(this.state)
    // console.log(this.props.user.data.uid)
    this.props.onBeforeComponentLoad(this.props.user.data, this.props.orderId)
  }
  componentWillUpdate (nextProps, nextState) {

  }

  clickStar (rating) {
    var rater = firebaseRef.auth().currentUser.uid
    var ratee
    switch (rater) {
      case (this.props.sellerId):
        console.log('the rater is the seller and the ratee is the buyer ' + rating)
        firebaseRef.database().ref('/traderating/' + this.props.buyerId + '/' + this.props.orderId).set({value: rating})
        break

      case (this.props.buyerId):
        console.log('the rater is the buyer and they ratee the seller ' + rating)
        firebaseRef.database().ref('/traderating/' + this.props.sellerId + '/' + this.props.orderId).set({value: rating})

    }
    if (!this.props.tradeFeedback.data) {
      this.props.updateRating(rating)
    }
  }
  render () {
    console.log('TradeFeedback.render')
    console.log(this.props)
    return (
      <div className='measure pv4'>
        <p className='tc flarge b'>
          How would you rate this transaction?
        </p>
        <div className='flex col cxc' >
          <Rating
            color='gold'
            value={this.props.tradeFeedback.data || 0}
            onClick={(e) => this.clickStar(e)}
          />
        </div>
        <div className='flex col cxc'>
          <TrustButton />
          <BlockButton />
        </div>
      </div>
    )
  }
}

export default TradeFeedback
