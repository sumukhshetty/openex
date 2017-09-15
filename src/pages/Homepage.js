import React, { Component } from 'react'
import Testimonials from '../testimonials/Homepage'
import { FormattedMessage } from 'react-intl'
import ResponsiveEmbed from 'react-responsive-embed'
import { connect } from 'react-redux'
import { firebaseRef } from '../index.js'
import NumberFormat from 'react-number-format'
import { browserHistory } from 'react-router'

class Home extends Component {
  state = {
    highestSellTrade: null,
    lowestBuyTrade: null,
    buyTradeCount: null,
    sellTradeCount: null
  }
  getHighestSellTrade = async () => {
    await firebaseRef
      .database()
      .ref(`/selltradeadvertisements/${this.props.country.data}`)
      .orderByChild('price')
      .limitToFirst(1)
      .on(`child_added`, snap =>
        this.setState({ highestSellTrade: snap.val().price })
      )
  }
  getLowestBuyTrade = async () => {
    await firebaseRef
      .database()
      .ref(`/buytradeadvertisements/${this.props.country.data}`)
      .orderByChild('price')
      .limitToLast(1)
      .on(`child_added`, snap =>
        this.setState({ lowestBuyTrade: snap.val().price })
      )
  }
  getTotalTradeCount = async () => {
    const allBuyTrades = await firebaseRef
      .database()
      .ref(`/buytradeadvertisements/${this.props.country.data}`)
      .on('value', snap =>
        this.setState({ buyTradeCount: Object.keys(snap.val()).length })
      )

    const allSellTrades = await firebaseRef
      .database()
      .ref(`/selltradeadvertisements/${this.props.country.data}`)
      .on('value', snap =>
        this.setState({ sellTradeCount: Object.keys(snap.val()).length })
      )
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.country.data && this.props.country.data) {
      this.getHighestSellTrade()
      this.getLowestBuyTrade()
      this.getTotalTradeCount()
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
                <a
                  className="white link underline ma2"
                  onClick={() => browserHistory.push('/login')}
                >
                  <FormattedMessage id="home.login" />
                </a>
                <button
                  className="bg-white blue br3 ma2"
                  onClick={() => browserHistory.push('/signup')}
                >
                  <FormattedMessage id="home.signup" />
                </button>
              </div>
              <button
                className="bg-white blue br3 ma2"
                onClick={() => browserHistory.push('/how')}
              >
                <FormattedMessage id="home.howThisWorks" />
              </button>
            </div>
          </section>
          <section className="pa4">
            <p className="measure-narrow center ma3 flarge tc">
              <FormattedMessage id="home.section2Header" />
            </p>
            <div className="tc center ma3 w-50-l w-100">
              <ResponsiveEmbed src="https://www.youtube.com/embed/K7BepI1aobg" />
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
                  {this.state.lowestBuyTrade
                    ? <NumberFormat
                        value={this.state.lowestBuyTrade}
                        thousandSeparator={true}
                        suffix={` ${this.props.currency.data}`}
                        className="bg-blue white bn"
                      />
                    : `...`}
                </p>
                <p className="fmedium white ">
                  <FormattedMessage id="home.metric2" />
                </p>
              </div>
              <div className="flex col tc ph4">
                <p className="f2 white mb2">
                  {this.state.highestSellTrade
                    ? <NumberFormat
                        value={this.state.highestSellTrade}
                        thousandSeparator={true}
                        suffix={` ${this.props.currency.data}`}
                        className="bg-blue white bn"
                      />
                    : `...`}
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
          <section className="flex wrap bg-gray mxa pa3">
            <p>
              <FormattedMessage id="home.asFeaturedOn" />
            </p>
            <p className="b">
              <FormattedMessage id="home.feature1" />
            </p>
            <p className="b">
              <FormattedMessage id="home.feature2" />
            </p>
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

const mapStateToProps = (state, ownProps) => {
  return {
    loadinguserdata: state.loadinguserdata,
    web3: state.web3,
    presence: state.presence,
    country: state.country,
    currency: state.currency
  }
}

export default connect(mapStateToProps)(Home)
