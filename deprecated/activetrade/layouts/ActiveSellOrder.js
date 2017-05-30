// ISSUE-231-80: THIS becomes ActiveTrade
import React, { Component } from 'react'
import ActiveSellOrderContainer from './../ui/ActiveSellOrderContainer'

class ActiveSellOrder extends Component {
  render () {
    return (
      <section className='bg-smoke'>
        <div className='w-100 center'>
          {/*ISSUE-231-43: pass in the user instead of the uid*/}
          <ActiveSellOrderContainer uid={this.props.authData.uid} params={this.props.params} />
        </div>
      </section>
    )
  }
}

export default ActiveSellOrder
