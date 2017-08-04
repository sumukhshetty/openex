import React, { Component } from 'react';
import { Link } from 'react-router';
import ezetherlogowhite from './../images/ezetherlogowhite.svg'
import { browserHistory } from 'react-router'

class HomeNav extends Component {
  login () {
    this.props.login(this.props.web3)
  }

  render () {
    return (
      <div className='container'>
        <div className='pure-g'>
          <div className='pure-u-1-4 brand'>
            <Link to='/'>
              <img className='brand' src={ezetherlogowhite} alt='' />
            </Link>
          </div>
          <div className='pure-u-3-4 menu'>
            <nav className='pure-menu pure-menu-horizontal'>
              <ul className='pure-menu-list'>
                <li className='pure-menu-item'><a onClick={()=>browserHistory.push('/')}>Home</a></li>
                <li className='pure-menu-item'><a onClick={()=>browserHistory.push('/gettingstarted')}>Getting Started</a></li>
                <li className='pure-menu-item'><a onClick={() => browserHistory.push('support')}>Support</a></li>

                <li className='pure-menu-item' onClick={this.login.bind(this)}><a>Log in</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeNav;
