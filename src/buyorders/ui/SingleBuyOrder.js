import React, { Component } from 'react'
import * as _ from 'lodash'
import SellButton from './SellButton'

class SingleBuyOrder extends Component {

  render(){

    return (
      <div>
        <li>David Washington - EUR</li>
        <li>IMPS</li>
        <li>1300 INR</li>
        <li>0-{this.props.buyOrderData.amountq}</li>
        <li>10 October 2017</li>
        <li>Sufficient</li>
        <li>Active</li>
        <li><SellButton/></li>
      </div>)
  }
}

export default SingleBuyOrder