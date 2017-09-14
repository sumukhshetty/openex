import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import face from '../images/face1.png'
import ethChart from '../images/ethChart.png'

export default class Terms extends Component {
  render() {
    return (
      <div>
        <div className="w-100 bg-smoke pa3">
          <div className="w-75 center">
            <div className="w-75 ">
              <h1 className="pt4">
                <FormattedMessage id="terms.header" />
              </h1>
              <p>
                <FormattedMessage id="terms.intro" />
              </p>
              <h2>
                <FormattedMessage id="terms.section1" />
              </h2>

              <p>
                <FormattedMessage id="terms.section1P1" />
              </p>
              <h2>
                <FormattedMessage id="terms.section2" />
              </h2>

              <p>
                <FormattedMessage id="terms.section2P1" />
              </p>
              <h2>
                <FormattedMessage id="terms.section3" />
              </h2>
            </div>
          </div>
        </div>
        <div className="w-100 bg-white pa3">
          <div className="w-75 center">
            <div className="w-75 ">
              <h2>
                <FormattedMessage id="terms.section4" />
              </h2>

              <p>
                <FormattedMessage id="terms.section4P1" />
              </p>
            </div>
          </div>
        </div>
        <div className="w-100 bg-smoke pa3">
          <div className="w-75 center">
            <div className="w-75 ">
              <h2>
                <FormattedMessage id="terms.section5" />
              </h2>

              <p>
                <FormattedMessage id="terms.section5P1" />
              </p>
              <p>
                <FormattedMessage id="terms.section5P2" />
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
