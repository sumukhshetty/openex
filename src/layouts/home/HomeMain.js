import Web3 from 'web3'
import React, { Component } from 'react'
import ProductShortDescription from './ProductShortDescription'
import SignUpContainer from './../../signup/SignUpContainer'
import MetaMask from './../../signup/MetaMask'
import Process from './Process'
import Footer from './../../footer/Footer'
import Features from './Features'
import BrowseAdvertisementsContainer from './../../browseadvertisements/ui/BrowseAdvertisementsContainer'

import truffleConfig from './../../../truffle-config.js'

var web3Location = `http://${truffleConfig.networks.development
  .host}:${truffleConfig.networks.development.port}`

class HomeMain extends Component {
  render() {
    //var web3 = this.web3Provided
    if (this.props.web3.data.currentProvider.isMetaMask) {
      return (
        <section className="home">
          <div className="container">
            <div>
              <div className="pure-u-2-3">
                <ProductShortDescription />
              </div>

              <div className="pure-u-1-3">
                <SignUpContainer web3={this.props.web3.data} />
              </div>
              <BrowseAdvertisementsContainer />
              <Features />
            </div>
          </div>
          <Process />
          {/*TODO add this in with the main lanch*/}
          {/*<Testimonials />*/}
          <Footer />
        </section>
      )
    } else {
      return (
        <section className="home">
          <div className="container">
            <div>
              <div className="pure-u-2-3">
                <ProductShortDescription />
              </div>

              <div className="pure-u-1-3">
                <MetaMask />
              </div>
              <BrowseAdvertisementsContainer />
              <Features />
            </div>
          </div>
          <Process />
          {/*TODO add this in with the main lanch*/}
          {/*<Testimonials />*/}
          <Footer />
        </section>
      )
    }
  }
}

export default HomeMain
