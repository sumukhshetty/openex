// ISSUE-231-80: THIS becomes ActiveTrade
import React, { Component } from 'react'
import ActiveTradeContainer from './../ui/ActiveTradeContainer'

class ActiveTrade extends Component {
  render () {
    return (
      <section className='bg-smoke'>
        <div className='w-100 center'>
          {/*ISSUE-231-21: pass in the user instead of the uid*/}

          <ActiveTradeContainer purchaseRequestId={this.props.params.purchaseRequestId}/>
        </div>
      </section>
    )
  }
}

export default ActiveTrade
