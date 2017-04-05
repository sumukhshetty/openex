import React, { Component } from 'react'
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
