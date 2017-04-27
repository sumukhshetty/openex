import React, { Component } from 'react'
import ActiveSellOrderContainer from './../ui/ActiveSellOrderContainer'

class ActiveSellOrder extends Component {
  render () {
    return (
      <section className='bg-smoke'>
        <div className='w-100 center'>
          <ActiveSellOrderContainer uid={this.props.authData.uid} params={this.props.params} />
        </div>
      </section>
    )
  }
}

export default ActiveSellOrder
