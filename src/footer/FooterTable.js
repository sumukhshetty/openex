import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class FooterTable extends Component {
  render() {
    return (
      <div className="w-50">
        <div className="pure-u-1-3">
          {/* About us */}
          <nav className="pure-menu">
            <ul className="pure-menu-list">
              <li>
                <h3 className="white">About Us</h3>
              </li>
              <li className="pure-menu-item">
                <a href="https://medium.com/automte/" className="white">
                  Blog
                </a>
              </li>
              <li className="pure-menu-item">
                <a
                  onClick={() => browserHistory.push('about')}
                  className="white"
                >
                  Who Are We
                </a>
              </li>
              {/*<li className='pure-menu-item'><a href='#'>Media Coverage</a></li>
              <li className='pure-menu-item'><a href='#'>Jobs</a></li>*/}
            </ul>
          </nav>
        </div>
        <div className="pure-u-1-3">
          {/* Support */}
          <nav className="pure-menu">
            <ul className="pure-menu-list">
              <li>
                <h3 className="white">Support</h3>
              </li>
              <li className="pure-menu-item">
                <a
                  target="_blank"
                  href="https://www.youtube.com/watch?v=jY16rNgexE4"
                  className="white"
                >
                  User Guide
                </a>
              </li>
              <li className="pure-menu-item">
                <a
                  onClick={() => browserHistory.push('termsofservice')}
                  className="white"
                >
                  Privacy &amp; Terms
                </a>
              </li>
              <li className="pure-menu-item">
                <a
                  onClick={() => browserHistory.push('support')}
                  className="white"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="pure-u-1-3">
          {/* Community */}
          <nav className="pure-menu">
            <ul className="pure-menu-list">
              <li>
                <h3 className="white">Community</h3>
              </li>
              {/*<li className='pure-menu-item'><a href='#'>Reddit</a></li>*/}
              {/*<li className='pure-menu-item'><a href='#'>Forum</a></li>*/}
              <li className="pure-menu-item">
                <a
                  target="_blank"
                  href="https://automte.herokuapp.com/"
                  className="white"
                >
                  Slack
                </a>
                <a
                  target="_blank"
                  href="https://automte.herokuapp.com/"
                  className="white"
                >
                  Facebook
                </a>
                <a
                  target="_blank"
                  href="https://automte.herokuapp.com/"
                  className="white"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default FooterTable
