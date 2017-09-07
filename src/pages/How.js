import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import face from '../images/face1.png'
import ethChart from '../images/ethChart.png'

export default class How extends Component {
  render() {
    return (
      <div>
        <div className="w-100 bg-smoke pa3">
          <div className="w-75 center flex mxb">
            <div className="w-75 pl4 pt4">
              <h1>
                <FormattedMessage id="how.header" />
              </h1>
              <h2>
                <FormattedMessage id="how.section1" />
              </h2>
              <div>
                <p>
                  <FormattedMessage id="how.section1P1" />
                </p>
                <p>
                  <FormattedMessage id="how.section1P2" />
                </p>
                <p>
                  <FormattedMessage id="how.section1P3" />
                </p>
                <div className="flex wrap w-100 mxa h5 cxc">
                  <figure className="tc">
                    <img src={face} alt="Sumukh" />
                    <figcaption>
                      <FormattedMessage id="about.section1caption1" />
                    </figcaption>
                  </figure>
                  <figure className="tc">
                    <img src={face} alt="QJ" />
                    <figcaption>
                      <FormattedMessage id="about.section1caption2" />
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 bg-white pa3">
          <div className="w-75 center flex mxb">
            <div className="w-75 pl4">
              <h2>
                <FormattedMessage id="how.section2" />
              </h2>
              <p>
                <FormattedMessage id="how.section2T1" />
              </p>
              <p>
                <FormattedMessage id="how.section2P1" />
              </p>
              <p>
                <FormattedMessage id="how.section2P2" />
              </p>

              <p>
                <FormattedMessage id="how.section2T2" />
              </p>
              <p>
                <FormattedMessage id="how.section2P3" />
              </p>
              <p>
                <FormattedMessage id="how.section2T3" />
              </p>
              <p>
                <FormattedMessage id="how.section2P4" />
              </p>
            </div>
          </div>
        </div>

        <div className="w-100 bg-smoke pa3">
          <div className="w-75 center flex mxb">
            <div className="w-75 pl4">
              <h2>
                <FormattedMessage id="how.section3" />
              </h2>
              <div>
                <p>
                  <FormattedMessage id="how.section3T1" />
                </p>
                <p>
                  <FormattedMessage id="how.section3P1" />
                </p>
                <p>
                  <FormattedMessage id="how.section3P2" />
                </p>
                <p>
                  <FormattedMessage id="how.section3P3" />
                </p>
                <p>
                  <FormattedMessage id="how.section3T2" />
                </p>
                <div className="flex wrap w-100 mxa h-auto cxc">
                  <figure className="tc">
                    <img src={face} alt="Sumukh" />
                    <figcaption>
                      <FormattedMessage id="how.section3caption1" />
                    </figcaption>
                  </figure>
                  <figure className="tc">
                    <img src={face} alt="QJ" />
                    <figcaption>
                      <FormattedMessage id="how.section3caption2" />
                    </figcaption>
                  </figure>
                  <figure className="tc">
                    <img src={face} alt="Sumukh" />
                    <figcaption>
                      <FormattedMessage id="how.section3caption3" />
                    </figcaption>
                  </figure>
                  <figure className="tc">
                    <img src={face} alt="QJ" />
                    <figcaption>
                      <FormattedMessage id="how.section3caption4" />
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 bg-white pa3 mb4">
          <div className="w-75 center flex mxb">
            <div className="w-75 pl4">
              <h2>
                <FormattedMessage id="how.section4" />
              </h2>
              <p>
                <FormattedMessage id="how.section4T1" />
              </p>
              <p>
                <FormattedMessage id="how.section4P1" />
              </p>
              <p>
                <FormattedMessage id="how.section4T2" />
              </p>
              <p>
                <FormattedMessage id="how.section4P2" />
              </p>
              <p>
                <FormattedMessage id="how.section4T3" />
              </p>
              <p>
                <FormattedMessage id="how.section4P3" />
              </p>
              <p>
                <FormattedMessage id="about.section4P4" />
              </p>
            </div>
          </div>
        </div>

        <div className="w-100 bg-smoke pa3 mb4">
          <div className="w-75 center flex mxb">
            <div className="w-75 pl4">
              <h2>
                <FormattedMessage id="how.section5" />
              </h2>

              <p>
                <FormattedMessage id="how.section5T1" />
              </p>
              <p>
                <FormattedMessage id="how.section5P1" />
              </p>
              <p>
                <FormattedMessage id="how.section5T2" />
              </p>
              <p>
                <FormattedMessage id="about.section5P2" />
              </p>
              <p>
                <FormattedMessage id="about.section5T3" />
              </p>
              <p>
                <FormattedMessage id="about.section5P3" />
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
