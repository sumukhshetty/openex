import React, { Component } from 'react'
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
              <li className='pure-menu-item'><a href='https://medium.com/automte/'>Blog</a></li>
              <li className='pure-menu-item'><a href='#'>Who Are We</a></li>
              <li className='pure-menu-item'><a href='#'>Media Coverage</a></li>
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
                <a href='#'>User Guide</a>
              </li>
              <li className='pure-menu-item'>
                <a href='#'>Contact Us</a>
              </li>
              <li className='pure-menu-item'>
                <a onClick={() => browserHistory.push('termsofservice')}>Privacy &amp; Terms</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className='pure-u-1-3'>
          {/* Community */}
          <nav className='pure-menu'>
            <ul className='pure-menu-list'>
              <li><h3>Community</h3></li>
              <li className='pure-menu-item'><a href='#'>Reddit</a></li>
              <li className='pure-menu-item'><a href='#'>Forum</a></li>
              <li className='pure-menu-item'><a href='#'>Slack</a></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default FooterTable
