import React, { Component } from 'react';

class BrowserWalletLockedAlert extends Component {
  render () {
    return (
        <div className='w-75 center'>
          <div className='flex mxe'>
            It looks like your metamask account is locked - please unlock it and refresh the page to continue using the exchange          
          </div>
        </div>
    );
  }
}

export default BrowserWalletLockedAlert;
