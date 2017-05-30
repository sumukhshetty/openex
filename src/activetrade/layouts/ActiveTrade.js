import React, { Component } from 'react'
import ActiveTradeContainer from './../ui/ActiveTradeContainer'

class ActiveTrade extends Component {
  render () {
    return (
      <section className='bg-smoke'>
        <div className='w-100 center'>
          <ActiveTradeContainer purchaseRequestId={this.props.params.purchaseRequestId}/>
        </div>
      </section>
    )
  }
}

export default ActiveTrade
