import React, { Component } from 'react'
import Header from './../../header/Header'
import Footer from './../../footer/Footer'
import HomeMain from './HomeMain'

class Home extends Component {
  render() {
    return(
      <section>
        <Header />
        <HomeMain />
        <Footer />
      </section>
    )
  }
}

export default Home
