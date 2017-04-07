import React, { Component } from 'react';
import { Link } from 'react-router';
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js';
import logo from './images/logo.svg';

// UI Components
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer';
import Web3InitContainer from './web3/Web3InitContainer';
import ProfileNotificationWallet from './profilenotificationwallet/layouts/ProfileNotificationWallet';
import Header from './header/Header';
import Footer from './footer/Footer';

// Styles
import './css/pure-min.css';
import './css/styles-common.css';
import './css/atomic.css';
import './css/swatch.css';
// import logo from './images/logo.svg'
import Bell from './images/svgReactComponents/Bell';
import Notifications from './notifications/NotificationsLayout';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showNotifications: false
    };
    this.removeNotifications = this.removeNotifications.bind(this);
    this.showNotifications = this.showNotifications.bind(this);
  }

  showNotifications () {
    this.setState({showNotifications: true});
  }

  removeNotifications () {
    this.setState({showNotifications: false});
  }
  render () {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <div className='menu'>
        <div className='container'>
          { this.state.showNotifications && <Notifications close={this.removeNotifications} />}
          <div className='pure-g flex mxb cxc'>
            <div className='pure-u-1-4 brand'>
              <Link to='/'>
                <img className='brand' src={logo} alt='' />
              </Link>
            </div>
            <div className='flex mxe cxc'>
              <Bell action={this.showNotifications} />
              <LogoutButtonContainer />
            </div>
          </div>
          <nav className='pure-menu pure-menu-horizontal'>
            <ul className='flex mxb ma0 pa0'>
              <li className='pure-menu-item'>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
              <li className='pure-menu-item'>
                <Link to='/buyorders'>Buy</Link>
              </li>
              <li className='pure-menu-item'>
                <Link to='/sellorders'>Sell</Link>
              </li>
              <li className='pure-menu-item'>
                <Link to='/posttrade'>Post a Trade</Link>
              </li>
              <li className='pure-menu-item'>
                <Link to='/help'>Help</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <Header />
    );

    return (
      <section className='App'>
        <OnlyGuestLinks />
        <Web3InitContainer />
        <OnlyAuthLinks />
        <main role='main'>
          {this.props.children}
        </main>
        <Footer />
      </section>
    );
  }
}

export default App;

//
//
// class HomeNav extends Component {
//   render () {
//     return (
//       <div className='container'>
//         <div className='pure-g'>
//           <div className='pure-u-1-4 brand'>
//             <Link to='/'>
//               <img className='brand' src={logo} alt='' />
//             </Link>
//           </div>
//           <div className='pure-u-3-4 menu'>
//             <nav className='pure-menu pure-menu-horizontal'>
//               <ul className='pure-menu-list'>
//                 <li className='pure-menu-item'><a href='#about'>About</a></li>
//                 <li className='pure-menu-item'><a href='#demo'>Demo</a></li>
//                 <li className='pure-menu-item'><a href='#trade'>Trade</a></li>
//                 <li className='pure-menu-item'><a href='#support'>Support</a></li>
//
//                 <li className='pure-menu-item'>
//                   <Link to='/login'>Log in</Link>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
