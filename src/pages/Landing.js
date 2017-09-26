import React, { Component } from 'react'
import Testimonials from '../testimonials/Homepage'
import { FormattedMessage } from 'react-intl'
import ResponsiveEmbed from 'react-responsive-embed'
import { connect } from 'react-redux'
import { firebaseRef } from '../index.js'
import NumberFormat from 'react-number-format'
import currencies from 'country-currency'
import Features from './Homepage/Features'
import WhyUseOurPlatform from './Homepage/WhyUseOurPlatform'

class Landing extends Component {
  state = {
    highestSellTrade: null,
    lowestBuyTrade: null,
    buyTradeCount: null,
    sellTradeCount: null
  }
  getHighestSellTrade = async () => {
    await firebaseRef
      .database()
      // .ref(`/selltradeadvertisements/${this.props.country}`)
      .ref(`/selltradeadvertisements/${this.props.country}`)
      .orderByChild('price')
      .limitToFirst(1)
      .on(`child_added`, snap =>
        this.setState({ highestSellTrade: snap.val().price })
      )
  }
  getLowestBuyTrade = async () => {
    await firebaseRef
      .database()
      .ref(`/buytradeadvertisements/${this.props.country}`)
      .orderByChild('price')
      .limitToLast(1)
      .on(`child_added`, snap =>
        this.setState({ lowestBuyTrade: snap.val().price })
      )
  }
  getTotalTradeCount = async () => {
    const allBuyTrades = await firebaseRef
      .database()
      .ref(`/buytradeadvertisements/${this.props.country}`)
      .on('value', snap =>
        this.setState({ buyTradeCount: Object.keys(snap.val()).length })
      )

    const allSellTrades = await firebaseRef
      .database()
      .ref(`/selltradeadvertisements/${this.props.country}`)
      .on('value', snap =>
        this.setState({ sellTradeCount: Object.keys(snap.val()).length })
      )
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.country.data && this.props.country.data) {
      this.getTotalTradeCount()
      this.getHighestSellTrade()
      this.getLowestBuyTrade()
    }
  }

  render() {
    if (this.props.loadinguserdata.data) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <section className="tc gradient pa4">
            <h1 className="fhuge white pt5 b">
              <FormattedMessage id="home.header" />
            </h1>
            <h2 className="flarge white">
              <FormattedMessage id="home.byline" />
            </h2>
            <div className="flex wrap mxa cxe w-50 center pt3 dn-m flex-l">
              <div className="col mxc dn flex-l">
                <a className="white link underline ma2">
                  <FormattedMessage id="home.login" />
                </a>
                <button className="bg-white blue br3 ma2">
                  <FormattedMessage id="home.signup" />
                </button>
              </div>
              <button className="bg-white blue br3 ma2">
                <FormattedMessage id="home.howThisWorks" />
              </button>
            </div>
          </section>
          <section className="pa4">
            <p className="measure-narrow center ma3 flarge tc">
              <FormattedMessage id="home.section2Header" />
            </p>
            <div className="tc center ma3 w-50-l w-100">
              <ResponsiveEmbed src="https://www.youtube.com/embed/9eJhipwfQRo" />
            </div>
          </section>
          <section className="flex wrap col cxc bg-blue pa4">
            <div className="flex mxc wrap">
              <div className=" col tc ph4 flex-l dn">
                <p className="f2 white mb2">
                  {this.state.buyTradeCount && this.state.sellTradeCount
                    ? this.state.buyTradeCount + this.state.sellTradeCount
                    : `...`}
                </p>
                <p className="fmedium white ">
                  <FormattedMessage id="home.metric1" />
                </p>
              </div>
              <div className="flex col tc ph4">
                <p className="f2 white mb2">
                  {this.state.lowestBuyTrade ? (
                    <NumberFormat
                      value={this.state.lowestBuyTrade}
                      thousandSeparator={true}
                      suffix={` ${currencies
                        .byCountry()
                        .get(this.props.country)}`}
                      className="bg-blue white bn"
                    />
                  ) : (
                    `...`
                  )}
                </p>
                <p className="fmedium white ">
                  <FormattedMessage id="home.metric2" />
                </p>
              </div>
              <div className="flex col tc ph4">
                <p className="f2 white mb2">
                  {this.state.highestSellTrade ? (
                    <NumberFormat
                      value={this.state.highestSellTrade}
                      thousandSeparator={true}
                      suffix={` ${currencies
                        .byCountry()
                        .get(this.props.country)}`}
                      className="bg-blue white bn"
                    />
                  ) : (
                    `...`
                  )}
                </p>
                <p className="fmedium white ">
                  <FormattedMessage id="home.metric3" />
                </p>
              </div>
            </div>
            <div className="flex wrap mxa w-75">
              <div className="flex col mxc mv3">
                <p className=" fsmall w4 white tc mv0">
                  <FormattedMessage id="home.benefit1line1" />
                </p>
                <p className="fsmall w4 white tc mv0">
                  <FormattedMessage id="home.benefit1line2" />
                </p>
              </div>
              <div className="flex col mxc mv3">
                <p className=" fsmall w4 white tc mv0">
                  <FormattedMessage id="home.benefit2line1" />
                </p>
                <p className="fsmall w4 white tc mv0">
                  <FormattedMessage id="home.benefit2line2" />
                </p>
              </div>
              <div className="flex col mxc mv3">
                <p className=" fsmall w4 white tc mv0">
                  <FormattedMessage id="home.benefit3line1" />
                </p>
                <p className="fsmall w4 white tc mv0">
                  <FormattedMessage id="home.benefit3line2" />
                </p>
              </div>
              <div className="flex col mxc mv3">
                <p className=" fsmall w4 white tc mv0">
                  <FormattedMessage id="home.benefit4line1" />
                </p>
                <p className="fsmall w4 white tc mv0">
                  <FormattedMessage id="home.benefit4line2" />
                </p>
              </div>
            </div>
          </section>
          <Features />
          <WhyUseOurPlatform />
          <Testimonials />
        </div>
      )
    }
  }
}

const Step = ({ image, byline }) => (
  <div className="flex col mxa cxc w5 h5 bg-white shadow-1 ma3">
    <div className="w3 flex mxc">{image}</div>
    <div className="w-100 tc">
      <p>{byline}</p>
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {
    loadinguserdata: state.loadinguserdata,
    web3: state.web3,
    presence: state.presence,
    country: ownProps.params.country,
    currency: ownProps.params.country
  }
}

export default connect(mapStateToProps)(Landing)
