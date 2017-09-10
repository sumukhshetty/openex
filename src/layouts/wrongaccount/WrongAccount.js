import React, {Component} from 'react';
import switchAccount from '../../images/switch.gif'

export default class WrongAccount extends Component {
  render() {
    return (
    <div className='flex x absolute--fill absolute bg-black-80 z-1'>
      <div className='bg-white w-75 h-75 br3 tc mt6 flex col x pv3'>
        <p className='measure f3'>Your wallet address seems to be different from your account</p>
        <p className='measure f5'>Please log into {this.props.walletAddress}</p>
        <div className='h-50'>
          <img src={switchAccount} alt='' className='unlock-gif' />
        </div>
        <p className='measure f5'>For help email support@ezether.com</p>
      </div>
    </div>
  )
  }
}
