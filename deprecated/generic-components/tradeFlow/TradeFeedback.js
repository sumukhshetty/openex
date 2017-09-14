import React, { Component } from 'react'
import Star from '../../images/Star.js'
import Block from '../../images/svgReactComponents/Block.js'
import TrustButton from './../../trust/layouts/TrustButton'
import BlockButton from './../../block/layouts/BlockButton'
import { firebaseRef } from './../../index.js'

class TradeFeedback extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(e)
  }
  clickStar(rating) {
    // console.log("clickStar")
    // console.log(rating);
    // console.log(this.props.orderId)
    // console.log(firebaseRef.auth().currentUser)
    var rater = firebaseRef.auth().currentUser.uid
    var ratee
    switch (rater) {
      case this.props.sellerId:
        console.log('the rater is seller and the ratee is the buyer ' + rating)
        firebaseRef
          .database()
          .ref('/traderating/' + this.props.buyerId + '/' + this.props.orderId)
          .set({ value: rating })
        /*        try{
          firebaseRef.database().ref('/traderating/'+this.props.buyerId+'/orderid/').set({value:rating})
        } catch(e){
          firebaseRef.database().ref('/traderating/'+this.props.buyerId+'/orderid/').set({value:rating})
          console.log("[seller-rating-buyer]", e)
        }*/
        break

      case this.props.buyerId:
        console.log('the rater is buyer and they ratee the seller ' + rating)
        firebaseRef
          .database()
          .ref('/traderating/' + this.props.sellerId + '/' + this.props.orderId)
          .set({ value: rating })
      /*        try {
          firebaseRef.database().ref('/traderating/'+this.props.sellerId+'/orderid/').push({value:rating})
        } catch(e){
          firebaseRef.database().ref('/traderating/'+this.props.sellerId+'/orderid/').set({value:rating})
          console.log("[buyer-rating-seller]", e)
        }*/
    }
  }
  render() {
    return (
      <div className="measure pv4">
        <p className="tc flarge b">How would you rate this transaction?</p>
        <div className="flex col cxc">
          <div className="rating">
            <span onClick={this.clickStar.bind(this, '5')}>☆</span>
            <span onClick={this.clickStar.bind(this, '4')}>☆</span>
            <span onClick={this.clickStar.bind(this, '3')}>☆</span>
            <span onClick={this.clickStar.bind(this, '2')}>☆</span>
            <span onClick={this.clickStar.bind(this, '1')}>☆</span>
          </div>
          {/*<form onClick={this.clickStar.bind(this)}>
        </form>*/}
        </div>
        <TrustButton />
        <BlockButton />
      </div>
    )
  }
}

export default TradeFeedback
