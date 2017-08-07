import React from 'react';

const WrongNetwork = () => {
  return (
    <div className='flex x absolute--fill absolute bg-black-80 z-1'>
      <div className='bg-white w-75 h-75 br3 tc mt6 flex col x pv3'>
        <p className='measure f3'>You seem to be connected to the wrong Ethereum network</p>
        <p className='measure f5'>For our beta, please connect to the Main Ethereum Network and refresh the page.</p>
        <p className='measure f5'>To change networks click on the happy fox icon in the address bar and select the proper network.</p>
      </div>
    </div>
  );
};

export default WrongNetwork;