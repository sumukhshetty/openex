import React, {Component} from 'react';
import unlock from '../../images/unlock.gif'


export default class LockedAccount extends Component {
  render() {
    return (
    <div className='flex x absolute--fill absolute bg-black-80 z-1'>
      <div className='bg-white w-75 h-75 br3 tc mt6 flex col x pv3'>
        <p className='measure f3'>Please unlock your MetaMask wallet</p>
        <div className='h-50'>
          <img src={unlock} alt='' className='unlock-gif' />
        </div>
        <p className='measure f5'>For help email support@ezether.com</p>
      </div>
    </div>
  )
  }
}
