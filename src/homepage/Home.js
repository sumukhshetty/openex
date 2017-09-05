import React, { Component } from 'react'
import Testimonials from './Testimonials'

export default class Home extends Component {
  render() {
    if (this.props.loadinguserdata.data) {
      return <div>Loading</div>
    } else {
      return (
        <div>
          <section className="tc gradient pa4">
            <p className="fhuge white pt5">
              Decentralized Ethereum Marketplace
            </p>
            <p className="flarge white">
              A cutting edge platform that combines security and ease of use
            </p>
            <div className="flex wrap mxa w-50 center cxc pt3">
              <a className="white link underline ma3">Login</a>
              <button className="bg-white blue br3 ma3">SignUp</button>
              <button className="bg-white blue br3 ma3">How This Works</button>
            </div>
          </section>
          <section className="pa4">
            <p className="measure-narrow center ma3 flarge tc">
              Trade directly with other users, keeping your money safe in smart
              contracts.
            </p>

            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/W0qn3oPYo5c"
              frameborder="0"
              className="ma3 center"
            />
          </section>
          <section className="flex wrap col cxc bg-blue pa4">
            <div className="flex mxc wrap">
              <div className="flex col tc ph4">
                <p className="f1 white mb2">87 ETH</p>
                <p className="fmedium white ttu">VOLUME TRADED TODAY</p>
              </div>
              <div className="flex col tc ph4">
                <p className="f1 white mb2">Rp 21,780</p>
                <p className="fmedium white ttu">Best Buy price</p>
              </div>
              <div className="flex col tc ph4">
                <p className="f1 white mb2">Rp 19,280</p>
                <p className="fmedium white ttu">Best sell price</p>
              </div>
            </div>
            <div className="flex wrap mxa w-75">
              <p className="ttu fsmall w4 white tc">FLAT 1% TRANSACTION FEE</p>
              <p className="ttu fsmall w4 white tc">
                USER DEFINED PAYMENT METHODS
              </p>
              <p className="ttu fsmall w4 white tc">
                QUICK & EFFICIENT KYC PROCESS
              </p>
              <p className="ttu fsmall w4 white tc">
                TRANSPARENT COINGECKO BASE RATE
              </p>
            </div>
          </section>
          <section className="flex wrap bg-gray mxa pa3">
            <p>As featured on</p>
            <p>Bitcoin talk</p>
            <p>dApp Universe</p>
          </section>
          <Testimonials />
        </div>
      )
    }
  }
}

const Step = ({ image, byline }) =>
  <div className="flex col mxa cxc w5 h5 bg-white shadow-1 ma3">
    <div className="w3 flex mxc">
      {image}
    </div>
    <div className="w-100 tc">
      <p>
        {byline}
      </p>
    </div>
  </div>
