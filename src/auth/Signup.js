import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import metamask from '../images/metamask_1.png'
import { connect } from 'react-redux'
import { signUpUser, signUpUserCustomAuth } from './authBox/SignUpFormActions'
import AuthBox from './authBox/AuthBox'
import ResponsiveEmbed from 'react-responsive-embed'

const Signup = ({
  loadinguserdata,
  web3,
  presence,
  user,
  country,
  onSignUpFormCustomAuthSubmit,
  onSignUpFormSubmit
}) =>
  <div>
    <div className="w-100 bg-smoke pa3">
      <div className="w-75 center flex wrap pv4">
        <div className="w-50 pt3">
          <section className="h-auto min-h-5">
            {web3.data.eth.accounts[0]
              ? <div className="w5 center bg-white shadow-1">
                  <div className="bg-gray tc ba pv1">
                    <p className="ftiny">Address</p>
                    <p className="ftiny">
                      {web3.data.eth.accounts[0]}
                    </p>
                  </div>
                  <div className="signup-form">
                    <AuthBox />
                  </div>
                </div>
              : <div className="w5 center flex col mxc h-100 min-h-5 tc bg-white shadow-1 pa3">
                  <p>Seems like you’re new here.</p>
                  <p>
                    Please <a href="https://metamask.io/">install metamask</a>
                    and proceed to Sign Up.
                  </p>
                </div>}
          </section>
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
      <div className="flex col pv4">
        <p className="measure-narrow center ma3 flarge tc ">
          Signing Up is Easy
        </p>
        <div className="tc center ma3 w-50-l w-100">
          <ResponsiveEmbed src="https://www.youtube.com/embed/W0qn3oPYo5c" />
        </div>
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

// Login.propTypes = {
//   loadinguserdata: PropTypes.array.isRequired,
//   web3: PropTypes.array.isRequired,
//   presence: PropTypes.array.isRequired
// }
// Login.defaultProps = {}

const mapStateToProps = (state, ownProps) => {
  return {
    loadinguserdata: state.loadinguserdata,
    web3: state.web3,
    presence: state.presence
  }
}

export default connect(mapStateToProps)(Signup)
