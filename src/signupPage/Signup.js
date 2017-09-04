import React from 'react'
import PropTypes from 'prop-types'
import SignUpContainer from './signupBox/SignUpContainer'
import { FormattedMessage } from 'react-intl'
import metamask from '../images/metamask_1.png'

const Login = ({ loadinguserdata, web3, presence }) =>
  <div>
    <div className="w-100 bg-smoke pa3">
      <div className="w-75 center flex wrap pv4">
        <div className="w-50 pt3">
          <SignUpContainer web3={web3.data} />
        </div>
        <div className="w-50 pa3">
          <div className="pl3">
            <h1>Signing Up is Easy</h1>
            <p>
              <FormattedMessage id="login.P1" />
            </p>
            <p>
              <FormattedMessage id="login.P2" />
            </p>
          </div>
        </div>
      </div>
      <div className="w-75 center">
        <p>
          <FormattedMessage id="login.P3" />
        </p>
        <p>
          <FormattedMessage id="login.P4" />
        </p>
      </div>
    </div>
    <div className="w-100 bg-white pa3">
      <div className="w-75 center flex wrap pv4">
        <section className="pa4">
          <p className="measure-narrow center ma3 flarge tc">
            Signing Up is Easy
          </p>

          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/W0qn3oPYo5c"
            frameborder="0"
            className="ma3 center"
          />
        </section>
      </div>
    </div>
    <div className="w-100 bg-smoke pa3">
      <div className="w-75 center flex wrap pv4">
        <section className="pa4">
          <p className="measure-narrow center ma3 flarge tc">
            Step by step instructions
          </p>
          <p className="measure-narrow center ma3 flarge tc">
            Stage 1: creating a meta mask account
          </p>

          <div className="flex wrap mxb">
            <figure className="tc w5 ma0">
              <img src={metamask} alt="Sumukh" className="w-100" />
              <figcaption>
                <FormattedMessage id="about.section1caption1" />
              </figcaption>
            </figure>
            <figure className="tc w5 ma0">
              <img src={metamask} alt="QJ" className="w-100" />
              <figcaption>
                <FormattedMessage id="about.section1caption2" />
              </figcaption>
            </figure>
            <figure className="tc w5 ma0">
              <img src={metamask} alt="Sumukh" className="w-100" />
              <figcaption>
                <FormattedMessage id="about.section1caption1" />
              </figcaption>
            </figure>
            <figure className="tc w5 ma0">
              <img src={metamask} alt="QJ" className="w-100" />
              <figcaption>
                <FormattedMessage id="about.section1caption2" />
              </figcaption>
            </figure>
            <figure className="tc w5 ma0">
              <img src={metamask} alt="Sumukh" className="w-100" />
              <figcaption>
                <FormattedMessage id="about.section1caption1" />
              </figcaption>
            </figure>
            <figure className="tc w5 ma0">
              <img src={metamask} alt="QJ" className="w-100" />
              <figcaption>
                <FormattedMessage id="about.section1caption2" />
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
    </div>
    <div className="w-100 bg-white pa3">
      <div className="w-75 center flex wrap pv4">
        <section className="pa4">
          <p className="measure-narrow center ma3 flarge tc">
            Stage 2: Backing up your private key
          </p>

          <div className="flex wrap mxb ">
            <figure className="tc w5 ma0">
              <img src={metamask} alt="Sumukh" className="w-100" />
              <figcaption>
                <FormattedMessage id="about.section1caption1" />
              </figcaption>
            </figure>
            <figure className="tc w5 ma0">
              <img src={metamask} alt="QJ" className="w-100" />
              <figcaption>
                <FormattedMessage id="about.section1caption2" />
              </figcaption>
            </figure>
            <figure className="tc w5 ma0">
              <img src={metamask} alt="Sumukh" className="w-100" />
              <figcaption>
                <FormattedMessage id="about.section1caption1" />
              </figcaption>
            </figure>
            <figure className="tc w5 ma0">
              <img src={metamask} alt="QJ" className="w-100" />
              <figcaption>
                <FormattedMessage id="about.section1caption2" />
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
    </div>
  </div>

Login.propTypes = {
  loadinguserdata: PropTypes.array.isRequired,
  web3: PropTypes.array.isRequired,
  presence: PropTypes.array.isRequired
}
Login.defaultProps = {}

export default Login
