// ISSUE-231-80: THIS becomes ActiveTrade
import React, { Component } from 'react'
import ActiveBuyOrderContainer from './../ui/ActiveBuyOrderContainer'

class ActiveBuyOrder extends Component {
  render () {
    return (
      <section className='bg-smoke'>
        <div className='w-100 center'>
          {/*ISSUE-231-21: pass in the user instead of the uid*/}

          <ActiveBuyOrderContainer uid={this.props.authData.uid} params={this.props.params} />
        </div>
      </section>
    )
  }
}

export default ActiveBuyOrder
