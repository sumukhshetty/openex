import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import face from '../images/face1.png'
import mediation from '../images/need_for_trustless mediation.png'
import resilienceA from '../images/a_resilient_infrastructure.png'
import resilienceB from '../images/b_resilient_infrastructure.png'

export default class UserGuide extends Component {
  render() {
    return (
      <article>
        <section className="w-75 center">
          <div className="measure pt4">
            <h1>The Ezether user Guide</h1>

            <h2>Installing metamask</h2>
            <ul>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />
                  Click
                  <a
                    href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                    target="_blank"
                    className="pl2"
                  >
                    here
                  </a>{' '}
                  to go to the Chrome Webstore and get the MetaMask plugin.
                </label>
              </li>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />
                  Click <b>Add to Chrome</b> to Install MetaMask as Google
                  Chrome extension.
                </label>
              </li>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />
                  Click <b>Add Extension</b> to confirm and MetaMask will be
                  added
                </label>
              </li>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />
                  Click the MetaMask logo
                </label>
              </li>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />
                  Read and agree to the MetaMask terms and Conditions
                </label>
              </li>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />
                  Click <b>Create a new vault</b>
                </label>
              </li>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />
                  Metamask will now show you your <i>seed</i>. It is
                  <b>very important</b> that you copy and store those 12 words,
                  without them you cannot restore your wallet.
                </label>
              </li>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />
                  Head to <a href="https://ezether.com/">ezether.com</a> and it
                  should detect your wallet automatically.
                </label>
              </li>
            </ul>
          </div>
        </section>
      </article>
    )
  }
}
