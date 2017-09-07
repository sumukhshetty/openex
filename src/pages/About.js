import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import face from '../images/face1.png'
import ethChart from '../images/ethChart.png'
import sumukh from '../images/team/sumukh.png'
import qj from '../images/team/qj.png'
import zakhil from '../images/team/zakhil.png'
import arseniy from '../images/team/arseniy.png'
import josh from '../images/team/josh.png'

export default class About extends Component {
  render() {
    const team = [
      'sumukh',
      'qj',
      'arseniy',
      'zakhil',
      'bharat',
      'josh',
      'abhishek'
    ]

    const teamBios = team.map((person, index) => {
      return (
        <div key={index} className="pa3 w-25-l w-50">
          <div className="w-100 tc">
            <img src={face} alt={person} />
          </div>
          <p className="tc b ttu">
            <FormattedMessage id={`about.${person}Name`} />
          </p>
          <p className="tc ttu">
            <FormattedMessage id={`about.${person}Title`} />
          </p>
          <p>
            <FormattedMessage id={`about.${person}Bio`} />
          </p>
        </div>
      )
    })
    return (
      <div>
        <div className="w-100 bg-smoke pt4">
          <div className="w-75 center pa3">
            <section className="w-100 mv3 bg-smoke">
              <h1 className="measure">
                <FormattedMessage id="about.header" />
              </h1>
              <div className="flex wrap mxc w-100">
                {teamBios}
              </div>
            </section>
          </div>
        </div>
        <div className="w-100 bg-white pa3">
          <div className="w-75 center flex mxb">
            <div className="w-25">
              {/* {Array(5).fill(null).map((value, index) =>
                <div>
                  <p className="tc pa3 ttu">
                <FormattedMessage id={`about.section${index + 1}`} />
                  </p>
                  {index !== 4 &&
                <div className="flex h3">
                <div className="w-50" />
                <div className="w-50 bl b--black" />
                </div>}
                </div>
              )} */}
            </div>
            <div className="w-75 pl4">
              <h2>
                <FormattedMessage id="about.section1" />
              </h2>
              <div>
                <FormattedMessage id="about.section1P1" />
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

                <FormattedMessage id="about.section1P2" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 bg-smoke pa3">
          <div className="w-75 center flex mxb">
            <div className="w-25" />
            <div className="w-75 pl4">
              <h2>
                <FormattedMessage id="about.section2" />
              </h2>
              <div>
                <FormattedMessage id="about.section2P1" />
                <div className="flex wrap w-100 mxa cxc">
                  <figure className="tc">
                    <img src={ethChart} alt="Etherium Price chart" />
                    <figcaption>
                      <FormattedMessage id="about.section2caption1" />
                    </figcaption>
                  </figure>
                </div>
                <FormattedMessage id="about.section2P2" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 bg-white pa3">
          <div className="w-75 center flex mxb">
            <div className="w-25" />
            <div className="w-75 pl4">
              <h2>
                <FormattedMessage id="about.section3" />
              </h2>
              <div>
                <p>
                  <FormattedMessage id="about.section3P1" />
                </p>
                <p>
                  <FormattedMessage id="about.section3P2" />
                </p>
                <p>
                  <FormattedMessage id="about.section3P3" />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 bg-smoke pa3">
          <div className="w-75 center flex mxb">
            <div className="w-25" />
            <div className="w-75 pl4">
              <h2>
                <FormattedMessage id="about.section4" />
              </h2>
              <div>
                <p>
                  <FormattedMessage id="about.section4P1" />
                </p>
                <p>
                  <FormattedMessage id="about.section4P2" />
                </p>
                <div className="flex wrap w-100 mxa cxc">
                  <img src={ethChart} alt="" className="w-50" />
                  <img src={ethChart} alt="" className="w-50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 bg-white pa3 mb4">
          <div className="w-75 center flex mxb">
            <div className="w-25" />
            <div className="w-75 pl4">
              <h2>
                <FormattedMessage id="about.section5" />
              </h2>
              <div>
                <p>
                  <FormattedMessage id="about.section5P1" />
                </p>
                <p>
                  <FormattedMessage id="about.section5P2" />
                </p>
                <p>
                  <FormattedMessage id="about.section5P3" />
                </p>
                <p>
                  <FormattedMessage id="about.section5P4" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
