import React, { Component } from 'react'

class MetaMaskWaitModal extends Component {
  render () {
    var url
    if (this.props.txhash){
      url = process.env.ETHER_SCAN_URL + 'tx/' + this.props.txhash
    }
    return (
      <div className='flex x absolute--fill fixed bg-black-80 z-1'>
        <div className='flex col x'>
          <div className='gradient w-100 pa4 shadow-1 flex col cxc'>
            <p className='b coal mt0'>{this.props.message}</p>
            {this.props.txhash ? <p className='b coal mt0'><a target="_blank" href={url}>{url}</a></p> : null}
          </div>
        </div>
      </div>
    )
  }
}

export default MetaMaskWaitModal
