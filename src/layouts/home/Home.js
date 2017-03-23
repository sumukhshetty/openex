import React, { Component } from 'react'
import Footer from './../../footer/Footer'
import HomeNav from './HomeNav'
import ProductShortDescription from './ProductShortDescription'
import SignUpContainer from './../../signup/SignUpContainer'

class Home extends Component {
  render() {
    return(
      <main className="container">
          <HomeNav/>
        <div className="pure-g">
          <div className="pure-u-1">
            <ProductShortDescription />
            <SignUpContainer/>
            <Footer/>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
