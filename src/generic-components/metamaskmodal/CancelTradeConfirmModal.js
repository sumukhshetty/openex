import React, { Component } from 'react'

class CancelTradeConfirmModal extends Component {

  render () {
    return (
      <div className='flex x absolute--fill fixed bg-black-80 z-1' onClick={this.props.close}>
        <div className='flex col x'>
          <div className='gradient w-100 pa4 shadow-1 flex col cxc'>
            <p className='b coal mt0'>Are you sure you want to cancel this trade?</p>
          </div>
          <button className='mt5 grow' onClick={this.props.cancelTrade}>Cancel Trade</button>
        </div>
      </div>
    )
  }
}

export default CancelTradeConfirmModal
