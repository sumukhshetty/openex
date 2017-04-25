import React, { Component } from 'react';

class MetaMaskWaitModal extends Component {
  render () {
    console.log("MetaMaskWaitModal")
    return (
      <div className="flex x absolute--fill fixed bg-black-80 z-1">
        <div className='flex col x'>
        <div className="gradient w-100 pa4 shadow-1 flex col cxc">
          <p className="b coal mt0">Please approve the transaction in MetaMask</p>
        </div>
      </div>
      </div>
      )
  }
}

export default MetaMaskWaitModal