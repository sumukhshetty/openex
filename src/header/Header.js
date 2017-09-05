import React, { Component } from 'react'
import HomeNavContainer from './HomeNavContainer'

export default class Header extends Component {
  render() {
    return (
      <header className="bg-blue">
        <HomeNavContainer />
      </header>
    )
  }
}
