import React, { Component } from 'react'
import Header from './../../header/Header'
import Footer from './../../footer/Footer'
import HomeMain from './HomeMain'

class Home extends Component {
  render() {
    return(
      <section className="home">
        <div className="container">
          <HomeMain />
        </div>
      </section>
    )
  }
}

export default Home
