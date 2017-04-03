// import React, { Component } from 'react'
// //TODO import HelpContainer
//
// class UnsupportedBrowser extends Component {
//   render() {
//     return(
//       <main className="container">
//         <div className="pure-g">
//           <div className="pure-u-1-1">
//             <h3>You seem to be using an unsupported browser</h3>
//             <p>To get the most out of using the Automte Ether Exchange please login to the new experinence with a supported browser</p>
//             <div>
//               Internet Explorer
//             </div>
//             <div>
//               Chrome
//             </div>
//             <div>
//               Firefox
//             </div>
//             <div>
//               Safari
//             </div>
//             <div>
//               Opera
//             </div>
//             <div>
//               <button> Got it </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     )
//   }
// }
//
// export default UnsupportedBrowser

import React from 'react';

const UseChrome = () => {
  return (
    <div className='flex col cxc fixed top-0 left-0 h-100 w-100 bg-black-60 z-1'>
      <div className='bg-algae white w6 h5 br3 tc mt6 flex col mxa cxc pv3'>
        <p className='measure-narrow'>To use Tamuro, you must use Google Chrome as your web browser.</p>
        <a href='https://www.google.com/chrome/browser/desktop/index.html' target='_blank'><button>Use Google Chrome</button></a>
      </div>
    </div>
  );
};

export default UseChrome;
