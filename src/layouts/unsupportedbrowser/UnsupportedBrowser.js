// TODO import Help Container
// Who's todo is this? leave your name beside it.

import React from 'react';
import browserImages from '../../images/browserGroup.png';

const UseChrome = () => {
  return (
    <div className='flex x absolute--fill absolute bg-black-80 z-1'>
      <div className='bg-white w-75 h-75 br3 tc mt6 flex col x pv3'>
        <p className='measure f3'>You seem to be using an unsupported browser</p>
        <p className='measure f5'>To get the most out of using the new Automte Ether Exchange
please login to the new experience with a supported browser.</p>
        <img
          src={browserImages}
          alt='different browser icons with chrome highlighted in colour' className='pa4 w-80' />
        <a href='https://www.google.com/chrome/browser/desktop/index.html' target='_blank' className='mv3'><button className='white'>Use Google Chrome</button></a>
      </div>
    </div>
  );
};

export default UseChrome;
