import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class FooterTable extends Component {
  render () {
    return (
      <div className='w-50'>
        <div className='pure-u-1-3'>
          {/* About us */}
          <nav className='pure-menu'>
            <ul className='pure-menu-list'>
              <li><h3>About Us</h3></li>
              <li className='pure-menu-item'><a href='#'>Blog</a></li>
              <li className='pure-menu-item'><a href='#'>About</a></li>
              <li className='pure-menu-item'><a href='#'>Branding</a></li>
              <li className='pure-menu-item'><a href='#'>News</a></li>
              <li className='pure-menu-item'><a href='#'>Jobs</a></li>
            </ul>
          </nav>
        </div>
        <div className='pure-u-1-3'>
          {/* Support */}
          <nav className='pure-menu'>
            <ul className='pure-menu-list'>
              <li><h3>Support</h3></li>
              <li className='pure-menu-item'>
                <a href='#'>Help Center</a>
              </li>
              <li className='pure-menu-item'>
                <a href='#'>Contact Us</a>
              </li>
              <li className='pure-menu-item'>
                <a href='#'>Copyright</a>
              </li>
              <li className='pure-menu-item'>
                <a href='#'>Cookies</a>
              </li>
              <li className='pure-menu-item'>
                <a onClick={()=>browserHistory.push("termsofservice")}>Privacy &amp; Terms</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className='pure-u-1-3'>
          {/* Community */}
          <nav className='pure-menu'>
            <ul className='pure-menu-list'>
              <li><h3>Community</h3></li>
              <li className='pure-menu-item'><a href='#'>Referrals</a></li>
              <li className='pure-menu-item'><a href='#'>Forum</a></li>
              <li className='pure-menu-item'><a href='#'>Twitter</a></li>
              <li className='pure-menu-item'><a href='#'>Slack</a></li>
              <li className='pure-menu-item'><a href='#'>Github</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default FooterTable;
