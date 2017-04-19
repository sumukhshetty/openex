import React, { Component } from 'react';
import etherium from '../../images/etherium.png';

export default class AddEscrow extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className='flex x absolute--fill fixed bg-black-80 z-1' onClick={this.props.close}>
        <div className='flex col x'>
          <div className='gradient w-100 pa4 shadow-1 flex col cxc' >
            {!this.props.sendingEther &&
            <div>
            <p className='b coal mt0'>How much do you wish to add?</p>
            <p className='b coal mt0'>Current Balance: {this.props.availableBalance}</p>
            <div className='flex cxc mxb w5'>
              <label className='pv1 coal flex cxc'>
                <img src={etherium} alt='etherium logo' className='pr3' /> Ether
              </label>
              <input type='number' step='any' className='w3 pa2' onChange={this.props.onEtherAmountChange}/>
            </div></div>}
            {this.props.sendingEther &&
              <div>
              <p className='b coal mt0'>Sending ether...</p>
              <p className='b coal mt0'>Please approve the transaction in MetaMask</p></div>}
          </div>
          {!this.props.sendingEther && <button onClick={this.props.handleEscrowRequest} className='mt5 grow' >Send Ether</button>}
        </div>
      </div>
    );
  }
}
