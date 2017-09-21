import React from 'react';
import etherium from '../../images/etherium.png';
import Flag from '../../images/Flag';

export default (props) => (
  <form className='w-75 flex col cxc' onSubmit={props.handleTradeRequest}>
    <div className='gradient w-100 pv3 shadow-1 flex col cxc'>
      <div className='flex cxc mxb w5'>
        <label className='pv1 white flex cxc'>
          <img src={etherium} alt='etherium logo' className='pr3' /> Ether
        </label>
        {/* TODO: [AK] maximum should be calculated and validated elsewhere */}
        <input id='etherAmount' type='number' value={props.etherAmount} step='any' className='w4 pa2' min='0.001' max={props.maxEther - (props.maxEther * 0.1)} onChange={props.onAmountChange} required/>
      </div>
      <div className='flex mv3'>
        <div className='flex col mxc'>
          <div className='w5 h1' />
          <div className='bt b--seethrough w-90 me h1' />
        </div>
{/*        <img
          src={ConvertSymbol}
          alt='conversion symbol'
          className='pa0 ma0 relative right-2'
          onClick={props.handleConversion} />*/}
      </div>
      <div className='flex cxc mxb w5'>
        <label className='pv1 white flex cxc'>
          <Flag country={props.country} className='pr3' /> {props.currency}
        </label>
        <input id='fiatAmount' type='number' value={props.fiatAmount} className='w4 pa2' onChange={props.onAmountChange}/>
      </div>
    </div>
    {props.price && <input type='submit' value='Send Trade Request' className='mt5' min='0.001' disabled={props.isButtonDisabled}/>}
  </form>
);
