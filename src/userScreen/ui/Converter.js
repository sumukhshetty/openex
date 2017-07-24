import React from 'react';
import etherium from '../../images/etherium.png';
import UsaFlag from '../../images/UsaFlag';
import ConvertSymbol from '../../images/convert.png';

export default (props) => (
  <form className='w-75 flex col cxc' onSubmit={props.handleTradeRequest}>
    <div className='gradient w-100 pv3 shadow-1 flex col cxc'>
      <div className='flex cxc mxb w5'>
        <label className='pv1 white flex cxc'>
          <img src={etherium} alt='etherium logo' className='pr3' />
        Ether
        </label>
        <input type='number' className='w3 pa2' />
      </div>
      <div className='flex mv3'>
        <div className='flex col mxc'>
          <div className='w5 h1' />
          <div className='bt b--seethrough w-90 me h1' />
        </div>
        {/*<img src={ConvertSymbol} alt='conversion symbol' className='pa0 ma0 relative right-2' onClick={props.handleConversion} />*/}
      </div>
      <div className='flex cxc mxb w5'>
        <label className='pv1 white flex cxc'>
          <UsaFlag className='pr3' />
      USD
      </label>
        <input type='number' className='w3 pa2' />
      </div>
    </div>
    <input type='submit' value='Send Trade Request' className='mt5' />
  </form>
);
