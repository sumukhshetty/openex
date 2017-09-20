import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import face from '../images/face1.png'

import sumukh from '../images/team/sumukh.png'
import qj from '../images/team/qj.png'
import zakhil from '../images/team/zakhil.png'
import arseniy from '../images/team/arseniy.png'
import josh from '../images/team/josh.png'
import bharat from '../images/team/bharat.png'

import jaaga from '../images/Building_the_structure_at_Jaaga.jpg'
import hillhacks from '../images/The_founding_team_at_hillhacks.jpg'
import escrow from '../images/Escrow_happens_on_the_blockchain_through_a_smart_contract.png'
import ethChart from '../images/Ethereum_prices_have_skyrocketed_over_the_past_year.png'

export default class About extends Component {
  render() {
    const teamMember = (name, photo) => (
      <div className="pa3 w-33-l w-50-m w-100">
        <div className="w-100 tc">
          <img src={photo} alt={name} />
        </div>
        <p className="tc b ttu">
          <FormattedMessage id={`about.${name}Name`} />
        </p>
        <p className="tc ttu">
          <FormattedMessage id={`about.${name}Title`} />
        </p>
        <p>
          <FormattedMessage id={`about.${name}Bio`} />
        </p>
      </div>
    )

    return (
      <div>
        <div className="w-100 bg-smoke pt4">
          <div className="w-75 center pa3">
            <section className="w-100 mv3 bg-smoke">
              <h1 className="measure">
                <FormattedMessage id="about.header" />
              </h1>
              <div className="flex wrap mxc w-100">
                {teamMember('sumukh', sumukh)}
                {teamMember('qj', qj)}
                {teamMember('arseniy', arseniy)}
                {teamMember('zakhil', zakhil)}
                {teamMember('bharat', bharat)}
                {teamMember('josh', josh)}
              </div>
            </section>
          </div>
        </div>
        <div className="w-100 bg-white pa3">
          <div className="w-75 center flex mxs">
            {/* <div className="w-25">
              {Array(5).fill(null).map((value, index) =>
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
              )}
            </div> */}
            <div className="w-100">
              <h2>
                <FormattedMessage id="about.section1" />
              </h2>
              <div>
                <FormattedMessage id="about.section1P1" />
                <div className="flex wrap w-100 mxs cxc ">
                  <figure className="tc w-50-l w-100 pa0 mh0 mv4">
                    <img
                      src={jaaga}
                      alt="Building the stucture at Jaaga"
                      className="cover"
                    />
                    <figcaption>
                      <FormattedMessage id="about.section1caption1" />
                    </figcaption>
                  </figure>
                  <figure className="tc w-50-l w-100 pa0 mh0 mv4">
                    <img
                      src={hillhacks}
                      alt="The founding team at hillhacks"
                      className="cover"
                    />
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
          <div className="w-75 center flex mxs">
            {/* <div className="w-25" /> */}
            <div className="w-100">
              <h2>
                <FormattedMessage id="about.section2" />
              </h2>
              <div>
                <FormattedMessage id="about.section2P1" />
                <div className="flex wrap w-100 mxa cxc">
                  <figure className="tc mh4 mv4">
                    <img
                      src={ethChart}
                      alt="Etherium Price chart"
                      className="w-100"
                    />
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
          <div className="w-75 center flex mxs">
            {/* <div className="w-25" /> */}
            <div className="w-100">
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
          <div className="w-75 center flex mxs">
            {/* <div className="w-25" /> */}
            <div className="w-100">
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
                <div className="flex wrap w-100 mxa cxs">
                  <figure className="tc mvh w-100">
                    <img
                      src={escrow}
                      alt="Escrow happens on the blockchain through a smart contract"
                      className="w-100"
                    />
                    <figcaption>
                      <FormattedMessage id="about.section4caption1" />
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 bg-white pa3 mb4">
          <div className="w-75 center flex mxs">
            {/* <div className="w-25" /> */}
            <div className="w-100">
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
