import React, { Component } from 'react'
import * as _ from 'lodash'
import BuyButton from './BuyButton'

class SingleSellOrder extends Component {

  render(){

    return (
      <div>
        <li>David Washington - EUR</li>
        <li>IMPS</li>
        <li>1300 INR</li>
        <li>0-100</li>
        <li>10 October 2017</li>
        <li>Sufficient</li>
        <li>Active</li>
        <li><BuyButton/></li>
      </div>)
  }
}

export default SingleSellOrder