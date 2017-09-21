import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import face from '../images/face1.png'
import mediation from '../images/need_for_trustless mediation.png'
import resilienceA from '../images/a_resilient_infrastructure.png'
import resilienceB from '../images/b_resilient_infrastructure.png'
import {Link} from 'react-router'


export default class UserGuide extends Component {
  render() {
    return (
      <article>
        <section className="w-75 center">
          <div className="pt4 w-100">
            <h1>The Ezether User Guide</h1>
            <div className='flex wrap w-100'>
              <div className='w-50-l w-100 pa3'>
                <h2>Installing Metamask</h2>
                <ol className='guide list'>
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
                </ol>
              </div>
              <div className='w-50-l w-100 pa3'>
                <h2>Signing Up</h2>
                <ol className='guide list'>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                      First install metamask. Click
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
                      Then head to <Link to='/signup'>Signup Page</Link> and fill up the signup form on the landing page. Click sign up once done.
                    </label>
                  </li>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                      Thats about it. Your account has been created.
                    </label>
                  </li>
                  <p className='pa3'>
                    <strong>Why metamask ?</strong><br/><br/>
                    Unlike applications that store your private keys, most DApps (decentralized apps) that are built on the ethereum blockchain allow for wallet management to happen on the clientside. We chose metamask because it is the easiest to setup and run on your device. But as long as you are using a decentralised browser, our site should work fine.
                    Your funds are most secure this way as no one can get access to your funds if they hack our servers or attack us. An attack on most existing centralized exchanges would mean your funds are vulnerable.
                  </p>
                </ol>
              </div>

              <div className='w-50-l w-100 pa3'>
                <h2>Buy Ether</h2>
                <ol className='guide list'>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                      If you are looking to buy ether, click on the <strong>Buy</strong> tab on the nav bar.
                    </label>
                  </li>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                      Multiple trades will be listed, look at whatever suits your needs in terms of limits, pricing, rating and past experience with trader
                    </label>
                  </li>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                    Click on the Buy button                    </label>
                  </li>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                    Enter the amount of ether you want to buy in the box. It will convert that amount to INR. This is the amount you will have to transfer to the seller                    </label>
                  </li>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                      Click on <strong>Send trade request</strong>. The seller will be notified.
                    </label>
                  </li>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                      It will redirect you to the dashboard, where your trade will be listed. Click on <strong>View/message</strong>.
                    </label>
                  </li>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                      You will have to wait for the seller to confirm the transaction. Once he confirms the transaction it will move from <strong>‘awaiting seller confirmation’</strong> to  <strong>‘awaiting payment’</strong>.
                    </label>
                  </li>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                      Transfer the amount to the sellers bank account. You can chat with the seller on the nav bar, and confirm with him about his bank details.
                    </label>
                  </li>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                      Once you complete payment, upload transaction receipt in the chat, and click on <strong>confirm payment</strong> button
                    </label>
                  </li>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                      The seller will then release the ether once the amount is deposited into his bank account.
                    </label>
                  </li>
                  <li>
                    <label className="control checkbox">
                      <input type="checkbox" />
                      <span className="control-indicator" />
                      If the seller is holding your funds fraudulently, you can dispute the trade. Our customer support team will then look at your case, and then justly resolve the dispute.
                    </label>
                  </li>
                </ol>
              </div>
              <SellEther></SellEther>
          </div>
        </div>
        </section>
      </article>
    )
  }
}

const SellEther = () =>
  <div className='w-50-l w-100 pa3'>
    <h2>Sell Ether </h2>
    <ol className='guide list'>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          If you are looking to buy ether, click on the <strong>Buy</strong> tab on the nav bar.
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          Multiple trades will be listed, look at whatever suits your needs in terms of limits, pricing, rating and past experience with trader
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
        Click on the Buy button                    </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
        Enter the amount of ether you want to buy in the box. It will convert that amount to INR. This is the amount you will have to transfer to the seller                    </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          Click on <strong>Send trade request</strong>. The seller will be notified.
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          It will redirect you to the dashboard, where your trade will be listed. Click on <strong>View/message</strong>.
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          You will have to wait for the seller to confirm the transaction. Once he confirms the transaction it will move from <strong>‘awaiting seller confirmation’</strong> to  <strong>‘awaiting payment’</strong>.
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          Transfer the amount to the sellers bank account. You can chat with the seller on the nav bar, and confirm with him about his bank details.
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          Once you complete payment, upload transaction receipt in the chat, and click on <strong>confirm payment</strong> button
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          The seller will then release the ether once the amount is deposited into his bank account.
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          If the seller is holding your funds fraudulently, you can dispute the trade. Our customer support team will then look at your case, and then justly resolve the dispute.
        </label>
      </li>
    </ol>
  </div>
