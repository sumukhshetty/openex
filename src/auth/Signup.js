import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { signUpUser, signUpUserCustomAuth } from './authBox/SignUpFormActions'
import AuthBox from './authBox/AuthBox'
import ResponsiveEmbed from 'react-responsive-embed'
import stage1a from '../images/stage1a.png'
import stage1b from '../images/stage1b.png'
import stage1c from '../images/stage1c.png'
import stage1d from '../images/stage1d.png'
import stage1e from '../images/stage1e.png'
import stage1f from '../images/stage1f.png'
import stage2a from '../images/stage2a.png'
import stage2b from '../images/stage2b.png'
import stage2c from '../images/stage2c.png'
import stage2d from '../images/stage2d.png'
import unlock from '../images/unlock.gif'

const Signup = ({
  loadinguserdata,
  web3,
  presence,
  user,
  country,
  onSignUpFormCustomAuthSubmit,
  onSignUpFormSubmit,
  account
}) => (
  <div>
    <div className="w-100 bg-smoke pa3">
      <div className="w-75 center flex wrap pv4">
        <div className="w-50-l w-100 pt3">
          <section className="h-auto min-h-5">
            {web3.data &&
              account.data && (
                <div className="w5 center bg-white shadow-1">
                  <div className="bg-gray tc ba pv1">
                    <p className="ftiny">
                      <FormattedMessage id="signup.authBoxAddress" />
                    </p>
                    <p className="ftiny">{account.data}</p>
                  </div>
                  <div className="signup-form">
                    <AuthBox />
                  </div>
                </div>
              )}
            {web3.data &&
              !account.data && (
                <div className="w5 center bg-white shadow-1">
                  <div className="w5 center flex col mxc h-100 pv3 tc bg-white shadow-1 pa3">
                    <p className="measure f3">
                      Please unlock your MetaMask wallet
                    </p>
                    <div className="h-50">
                      <img src={unlock} alt="" className="unlock-gif" />
                    </div>
                  </div>
                </div>
              )}
            {!web3.data && (
              <div className="w5 center flex col mxc h-100 min-h-5 tc bg-white shadow-1 pa3">
                <p>
                  <FormattedMessage id="signup.authBoxNoEntryP1" />
                </p>
                <p>
                  <FormattedMessage
                    id="signup.authBoxNoEntryP2"
                    values={{
                      metamaskLink: (
                        <a href="https://metamask.io/" target="_blank">
                          install metamask
                        </a>
                      )
                    }}
                  />
                </p>
              </div>
            )}
          </section>
        </div>
        <div className="w-50-l w-100 pa3">
          <div className="pl3">
            <h1>
              <FormattedMessage id="signup.header" />
            </h1>
            <p>
              <FormattedMessage id="signup.P1" />
            </p>
            <p>
              <FormattedMessage id="signup.P2" />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="w-100 bg-white pa3">
      <div className="flex col pv4">
        <p className="measure-narrow center ma3 flarge tc ">
          <FormattedMessage id="signup.section2Header" />
        </p>
        <div className="tc center ma3 w-50-l w-100">
          <ResponsiveEmbed src="https://www.youtube.com/embed/9eJhipwfQRo" />
        </div>
      </div>
    </div>
    <div className="w-100 bg-smoke pa3">
      <div className="w-75 center flex wrap pv4">
        <section className="pa4">
          <p className="measure-narrow center ma3 flarge tc">
            <FormattedMessage id="signup.section3Header" />
          </p>
          <p className="measure-narrow center ma3 flarge tc">
            <FormattedMessage id="signup.stage1" />
          </p>

          <div className="flex wrap mxc">
            <figure className="tc w5 w-25-l mh0 mv2">
              <img src={stage1a} alt="step 1" className="w-100" />
              <figcaption>
                <FormattedMessage id="signup.stage1caption1" />
              </figcaption>
            </figure>
            <figure className="tc w5 w-25-l mh0 mv2">
              <img src={stage1b} alt="step 2" className="w-100" />
              <figcaption>
                <FormattedMessage id="signup.stage1caption2" />
              </figcaption>
            </figure>
            <figure className="tc w5 w-25-l mh0 mv2">
              <img src={stage1c} alt="step 3" className="w-100" />
              <figcaption>
                <FormattedMessage id="signup.stage1caption3" />
              </figcaption>
            </figure>
            <figure className="tc w5 w-25-l mh0 mv2">
              <img src={stage1d} alt="step 4" className="w-100" />
              <figcaption>
                <FormattedMessage
                  id="signup.stage1caption4"
                  values={{
                    dangerWord: <span className="danger">IMPORTANT</span>
                  }}
                />
              </figcaption>
            </figure>
            <figure className="tc w5 w-25-l mh0 mv2">
              <img src={stage1e} alt="step 5" className="w-100" />
              {/* <figcaption>
                <FormattedMessage id="signup.stage1caption5" />
              </figcaption> */}
            </figure>
            <figure className="tc w5 w-25-l mh0 mv2">
              <img src={stage1f} alt="step 6" className="w-100" />
              {/* <figcaption>
                <FormattedMessage id="signup.stage1caption6" />
              </figcaption> */}
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

          <div className="flex wrap mxc ">
            <figure className="tc w5 w-25-l mh0 mv2">
              <img src={stage2a} alt="step 1" className="w-100" />
              <figcaption>
                <FormattedMessage id="signup.stage2caption1" />
              </figcaption>
            </figure>
            <figure className="tc w5 w-25-l mh0 mv2">
              <img src={stage2b} alt="step 2" className="w-100" />
              <figcaption>
                <FormattedMessage id="signup.stage2caption2" />
              </figcaption>
            </figure>
            <figure className="tc w5 w-25-l mh0 mv2">
              <img src={stage2c} alt="step 3" className="w-100" />
              <figcaption>
                <FormattedMessage id="signup.stage2caption3" />
              </figcaption>
            </figure>
            <figure className="tc w5 w-25-l mh0 mv2">
              <img src={stage2d} alt="step 4" className="w-100" />
              <figcaption>
                <FormattedMessage
                  id="signup.stage2caption4"
                  values={{
                    dangerWord: <span className="danger">IMPORTANT</span>
                  }}
                />
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
    </div>
  </div>
)

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
    presence: state.presence,
    account: state.account
  }
}

export default connect(mapStateToProps)(Signup)
