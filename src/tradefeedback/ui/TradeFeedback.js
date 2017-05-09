import React, { Component } from 'react';
import Star from '../../images/Star.js';
import Block from '../../images/svgReactComponents/Block.js';
import TrustButton from './../../trust/layouts/TrustButton'
import BlockButton from './../../block/layouts/BlockButton'
import {firebaseRef} from './../../index.js';

class TradeFeedback extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount(){
    console.log("TradeFeedback.componentWillMount")
    console.log(this.props)
    console.log(this.state)
    console.log(this.props.user.data.uid)
    this.props.onBeforeComponentLoad(this.props.user.data,this.props.orderId)
  }


  clickStar(rating){
    var rater = firebaseRef.auth().currentUser.uid
    var ratee
    switch (rater){
      case (this.props.sellerId):
        console.log("the rater is the seller and the ratee is the buyer " + rating)
        firebaseRef.database().ref('/traderating/'+this.props.buyerId+'/'+this.props.orderId).set({value:rating})
        break
      
      case (this.props.buyerId):
        console.log("the rater is the buyer and they ratee the seller " + rating)
        firebaseRef.database().ref('/traderating/'+this.props.sellerId+'/'+this.props.orderId).set({value:rating})
        
    }
    this.props.updateRating(rating)
  }
  render () {
    console.log("TradeFeedback.render")
    console.log(this.props)
    return (
      <div className='measure pv4'>
        <p className='tc flarge b'>
          How would you rate this transaction?
        </p>
        <div className='flex col cxc' >
          <div className='rating'>
            <span onClick={this.clickStar.bind(this, "5")}>☆</span>
            <span onClick={this.clickStar.bind(this, "4")}>☆</span>
            <span onClick={this.clickStar.bind(this, "3")}>☆</span>
            <span onClick={this.clickStar.bind(this, "2")}>☆</span>
            <span onClick={this.clickStar.bind(this, "1")}>☆</span>
          </div>
        </div>
        <TrustButton />
        <BlockButton />
      </div>
    );
  }
}

export default TradeFeedback;
