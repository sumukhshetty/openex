import React, { Component } from 'react';
import etherium from '../../images/etherium.png';

export default class AddEscrow extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: null
    };
  }
  render () {
    return (
      <div className='flex x absolute--fill fixed bg-black-80 z-1' onClick={this.props.close}>
        <form className='flex col x' onSubmit={this.props.handleEscrowRequest}>
          <div className='gradient w-100 pa4 shadow-1 flex col cxc' >
            <p className='b coal mt0'>How much do you wish to add?</p>
            <div className='flex cxc mxb w5'>
              <label className='pv1 coal flex cxc'>
                <img src={etherium} alt='etherium logo' className='pr3' /> Ether
              </label>
              <input type='number' className='w3 pa2' />
            </div>
          </div>
          <input type='submit' value='Send Ether Request' className='mt5 grow' />
        </form>
      </div>
    );
  }
}
