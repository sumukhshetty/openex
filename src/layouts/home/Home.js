import React, { Component } from 'react'
import HomeMain from './HomeMain'
import BrowserDetection from 'react-browser-detection'
import Process from './Process'
import UnsupportedBrowser from './../unsupportedbrowser/UnsupportedBrowser'
import Testimonials from './Testimonials'
import Subscribe from './Subscribe'
import Footer from './../../footer/Footer'

const browserHandler = {
  chrome: () => <HomeMain />,
  firefox: () => <HomeMain />,
  default: (browser) => <UnsupportedBrowser />
}

class Home extends Component {
  render () {
    return (
      <section className='home'>
        <div className='container'>
          <BrowserDetection>
            {browserHandler}
          </BrowserDetection>
        </div>
        <Process />
      {/*TODO add this in with the main lanch*/}
        {/*<Testimonials />*/}
        <Subscribe />
        <Footer/>
      </section>
    )
  }
}

export default Home
