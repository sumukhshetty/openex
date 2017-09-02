import React, { Component } from 'react'
import HomeNavContainer from './HomeNavContainer'

class Header extends Component {
  render() {
    return (
      <header className="bg-blue">
        <HomeNavContainer />
      </header>
    )
  }
}

export default Header
