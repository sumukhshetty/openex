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

          <h1 className='pt4'>The Ezether User Guide</h1>
          <div className='flex wrap w-100'>
            <InstallingMetamask></InstallingMetamask>
            <SigningUp></SigningUp>
            <BuyEther></BuyEther>
            <SellEther></SellEther>
            <DisputeTrade></DisputeTrade>
            <CancelTrade></CancelTrade>
            <CreatingAdvertisements></CreatingAdvertisements>
            <EditTrade></EditTrade>
          </div>

        </section>
      </article>
    )
  }
}

const InstallingMetamask = () =>   <div className='w-50-l w-100 pa3'>
  <a href="#metamask" className='link dark-gray'><h2>Installing Metamask</h2></a>
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


const SigningUp = () => <div className='w-50-l w-100 pa3'>

  <a href="#signup" className='link dark-gray'><h2>Signing Up</h2></a>
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

const BuyEther = () =>
  <div className='w-50-l w-100 pa3'>

    <a href="#buyether" className='link dark-gray'><h2>Buy Ether</h2></a>
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


const SellEther = () =>
  <div className='w-50-l w-100 pa3'>
    <a href="#sellether" className='link dark-gray'><h2>Sell Ether</h2></a>
    <ol className='guide list'>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          If you are looking to sell ether, click on the Sell tab on the nav bar.
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          Multiple trades will be listed, look at whatever suits your needs in terms of limits, pricing, rating and past experience with trader.
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          Click on the <strong>Sell</strong> button.                   </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
        Enter the amount of ether you want to sell in the box. It will convert that amount to INR. This is the amount the buyer will transfer to your bank account.                  </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          Click on <strong>Send trade request</strong>. The buyer will be notified.

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
          You will have to <strong>confirm</strong> the transaction (this step is necessary because a smart contract holds your funds in escrow). Once you confirm the transaction it will move from awaiting seller confirmation to  awaiting payment.
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          The buyer will then transfer the amount to your bank account. You can chat with the buyer on the chat box, and confirm details about the transaction with him.
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          Once he completes payment, transaction will move to awaiting release. Once the money is in your account, you can click on <strong>release ether</strong>.
        </label>
      </li>
      <li>
        <label className="control checkbox">
          <input type="checkbox" />
          <span className="control-indicator" />
          If the buyer has fraudulently marked the payment complete you can initiate a dispute. Our customer support team will then look at your case, and then justly resolve the dispute.
        </label>
      </li>
    </ol>
  </div>

  const DisputeTrade = () =>
    <div className='w-50-l w-100 pa3'>

      <a href="#dispute" className='link dark-gray'><h2>Disputing a Trade</h2></a>
      <ol className='guide list'>
        <li>
          <label className="control checkbox">
            <input type="checkbox" />
            <span className="control-indicator" />
            According to the state of the transaction, a <strong>dispute</strong> button will arise to the seller and buyer during the transaction
          </label>
        </li>
        <li>
          <label className="control checkbox">
            <input type="checkbox" />
            <span className="control-indicator" />
            This button will be on the right side, right below instructions.
          </label>
        </li>
        <li>
          <label className="control checkbox">
            <input type="checkbox" />
            <span className="control-indicator" />
            Once you click it, the transactions will move to a state of dispute. <strong>In this state, neither the buyer nor the seller can make any more actions. </strong>                  </label>
        </li>
        <li>
          <label className="control checkbox">
            <input type="checkbox" />
            <span className="control-indicator" />Both parties will have to wait for the customer support team to resolve the transaction. The team will look into different documents depending on the country, but it will mostly be the buyers bank transaction receipt and his bank statements. If we find at any point the buyer is supplying false information, we will resolve the case by transferring the ether to seller. If the buyer is honest, and all his information checks out, we will transfer it to the buyer. </label>
        </li>

      </ol>
    </div>

    const CancelTrade = () =>
      <div className='w-50-l w-100 pa3'>

        <a href="#cancel" className='link dark-gray'><h2>Cancelling a Trade</h2></a>
        <ol className='guide list'>
          <li>
            <label className="control checkbox">
              <input type="checkbox" />
              <span className="control-indicator" />
              Before the seller confirms the transaction, both parties can cancel the trade if they wish to.
            </label>
          </li>
          <li>
            <label className="control checkbox">
              <input type="checkbox" />
              <span className="control-indicator" />
              The cancel trade button will be located on the right side below all the instructions.
            </label>
          </li>
          <li>
            <label className="control checkbox">
              <input type="checkbox" />
              <span className="control-indicator" />
            Click on cancel trade, and the trade will move to completed trades section.                   </label>
          </li>
          <li>
            <label className="control checkbox">
              <input type="checkbox" />
              <span className="control-indicator" />
            Enter the amount of ether you want to sell in the box. It will convert that amount to INR. This is the amount the buyer will transfer to your bank account.                  </label>
          </li>
          <li>
            <label className="control checkbox">
              <input type="checkbox" />
              <span className="control-indicator" />
              Click on <strong>Send trade request</strong>. The buyer will be notified.

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
              You will have to <strong>confirm</strong> the transaction (this step is necessary because a smart contract holds your funds in escrow). Once you confirm the transaction it will move from awaiting seller confirmation to  awaiting payment.
            </label>
          </li>
          <li>
            <label className="control checkbox">
              <input type="checkbox" />
              <span className="control-indicator" />
              The buyer will then transfer the amount to your bank account. You can chat with the buyer on the chat box, and confirm details about the transaction with him.
            </label>
          </li>
          <li>
            <label className="control checkbox">
              <input type="checkbox" />
              <span className="control-indicator" />
              Once he completes payment, transaction will move to awaiting release. Once the money is in your account, you can click on <strong>release ether</strong>.
            </label>
          </li>
          <li>
            <label className="control checkbox">
              <input type="checkbox" />
              <span className="control-indicator" />
              If the buyer has fraudulently marked the payment complete you can initiate a dispute. Our customer support team will then look at your case, and then justly resolve the dispute.
            </label>
          </li>
        </ol>
      </div>

      const CreatingAdvertisements = () =>
        <div className='w-50-l w-100 pa3'>
          <a href="#ads" className='link dark-gray'><h2>Creating Advertisements (for traders)</h2></a>
          <ol className='guide list'>
            <p className='pa3'>You can create advertisements to buy ether or to sell ether. We recommend that you create ads only if you trade regularly.</p>
            <li>
              <label className="control checkbox">
                <input type="checkbox" />
                <span className="control-indicator" />
                Go to Your Advertisements and click on Create Advertisement or on  the nav bar you can click on Post a trade.
              </label>
            </li>
            <li>
              <label className="control checkbox">
                <input type="checkbox" />
                <span className="control-indicator" />
                You then select Buy ether or sell ether depending on what you want to do.
              </label>
            </li>
            <li>
              <label className="control checkbox">
                <input type="checkbox" />
                <span className="control-indicator" />
              Add all the information accordingly one each of the boxes.                   </label>
            </li>
            <li>
              <label className="control checkbox">
                <input type="checkbox" />
                <span className="control-indicator" />
              Click on Publish advertisement and Voila ! Your ad is live on the exchange. You will be able to view and edit the ad on the dashboard under your advertisements.                  </label>
            </li>
            <p className='pa3'><strong>Information required for the ads</strong></p>
            <p className='pa3'>Location - Our system works on giving you local trade ads so we would require the location of where your ad is live. This would help you also find local buyers if you are looking for cash trades. </p><p className='pa3'>
              Margin* - This the percentage above or below market that you want to buy or sell ether at. Enter in any valid integer. The price of the trade is calculated in real time by getting the price from the cryptocompare api. In the future we intend to offer more elegant pricing equations and various apis to choose from. You can change the margin at any time by editing the advertisement. Any trades that are created before the margin is updated will not be changed automatically.
            </p>
            <p className='pa3'>Payment Method* - enter in the bank account information that you want people to deposit fiat into. This information will only be shared when you a confirm a trade. Alternatively, you can specify that you will share the bank information in Chat.</p>
            <p className='pa3'>Min Transaction Limit - The minimum amount that you want to do for a transaction in your local currency.</p>
            <p className='pa3'>Max Transaction Limit - The maximum amount that you want to do for a transaction in your local currency</p>
            <p className='pa3'>Terms of trade* - the terms of the trade that you want to communicate for a few examples see here.</p>
          </ol>
        </div>


        const EditTrade = () =>
          <div className='w-50-l w-100 pa3'>

            <a href="#edit" className='link dark-gray'><h2>Edit a Trade</h2></a>
            <ol className='guide list'>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />
                  Go to the Dashboard.
                </label>
              </li>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />
                  Head to the Your Advertisements section.
                </label>
              </li>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />
                You will see an edit button to each of your trades.                 </label>
              </li>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />You now can edit the existing trade and change the details.</label>
              </li>
              <li>
                <label className="control checkbox">
                  <input type="checkbox" />
                  <span className="control-indicator" />Click on Publish Advertisement once all the changes are made</label>
              </li>
            </ol>
          </div>
