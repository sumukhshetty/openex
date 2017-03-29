import React, { Component } from 'react'
import Header from './../../header/Header'
import Footer from './../../footer/Footer'
import HomeMain from './HomeMain'

class Home extends Component {
  render() {
    return(
      <div className="container">
        <HomeMain />
      </div>
    )
  }
}

export default Home
