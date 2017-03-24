import React, { Component } from 'react'
import { Link } from 'react-router'
import logo from '../images/logo.svg'

class HomeNav extends Component {
  render() {
    return(
      <div className="container">
        <div className="pure-g">
          <div className="pure-u-1-4 brand">
            <Link to="/">
              <img className="brand" src={logo} alt="" />
            </Link>
          </div>
          <div className="pure-u-3-4 menu">
            <nav className="pure-menu pure-menu-horizontal">
              <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#about">About</a></li>
                <li className="pure-menu-item"><a href="#demo">Demo</a></li>
                <li className="pure-menu-item"><a href="#trade">Trade</a></li>
                <li className="pure-menu-item"><a href="#support">Support</a></li>

                <li className="pure-menu-item">
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li className="pure-menu-item">
                  <Link to="/login">Log in</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeNav
