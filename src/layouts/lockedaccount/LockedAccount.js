import React, {Component} from 'react';

export default class LockedAccount extends Component {
  render() {
    return (
    <div className='flex x absolute--fill absolute bg-black-80 z-1'>
      <div className='bg-white w-75 h-75 br3 tc mt6 flex col x pv3'>
        <p className='measure f3'>Your wallet seems to be locked</p>
        <p className='measure f5'>please check that your wallet is unlocked</p>
        <p className='measure f5'>For help email support@automte.com</p>
      </div>
    </div>
  )  
  }
}