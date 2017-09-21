import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import {Link} from 'react-router'


export default class UserGuide extends Component {
  render() {
    return (
      <article className='h-auto'>
        <section className="w-75 center">
          <h1 className='pt4'>Frequently Asked Questions</h1>

          <Basics/>
          <Security/>
          <Operations/>
          <System/>
          <Glossary/>
          
        </section>
      </article>
    )
  }
}

const Basics = () =>
  <div className='w-50-l w-100'>
    <h2>Basics</h2>
    <details>
      <summary>What is ether, and what use does it have?</summary>
      <p>Ether is a token on the Ethereum network, a unique piece of code that can be used to pay for the computational resources needed to run an application or program.</p>
      <p>The Ethereum network is fast emerging as the backbone of the next generation of interent services, and is suitable for use as a medium of exchange because it can be transferred very quickly, and is expected to have value for a long time.</p>
    </details>
    <details>
      <summary>What are cryptocurrencies, and how do they have value?</summary>
      <p>Fiat currency, the currency we use in our everyday transaction, derives its value from the government making a promise to uphold the value everywhere.</p>
      <p>Cryptocurrencies, on the other hand, generate their value due to the willingness in other people to trade in them, because it’s believed to be a better way of storing value.</p>
    </details>
    <details>
      <summary>What is an ethereum wallet?</summary>
      <p>An Ethereum wallet is used to store your ether, and send/receive your ether. We believe the most convenient wallet in the existing ecosystem is Metamask, and use that to allow users to exchange ether.</p>

    </details>
    <details>
      <summary>How do I transfer my ether to someone else?</summary>
      <p>You need the address of the other person’s wallet, and then you can use the ‘SEND’ functionality on Metamask.</p>

    </details>
    <details>
      <summary>I sent ether to the wrong address. Can I get them back?</summary>
      <p>No. Please be very careful when you put in the address for a transaction. It is better to use copy-paste because typing such long addresses can lead to a mistype.</p>

    </details>
    <details>
      <summary>What is a smart contract?</summary>
      <p>Smart contracts are programmed contracts, enforcing their rules automatically when previously agreed-on conditions are are met.</p>

    </details>
    <details>
      <summary>What benefit do I get by getting into a smart contract?</summary>
      <p>Smart contracts eliminate the middle man, who doesn’t provide value to a transaction in most situations. On the rare occasion there’s a dispute, the funds are held in ‘escrow’ and both sides argue their case and a mediator will decide whose story is accurate.</p>

    </details>
    <details>
      <summary>Does ezether use smart contracts?</summary>
      <p>Yes, we do. Ethereum is the perfect currency to implement smart contracts, and we use smart contracts for placing ether in escrow for each and every trade taking place in our system.</p>

    </details>
    <details>
      <summary>What is escrow?</summary>
      <p>The word escrow comes from the Anglo-French escrowe, which roughly means ‘a scrap, of paper, a piece cut off.’ It was originally a deed delivered to a third person until a future condition is satisfied, which led to sense of ‘deposit held in trust or security’.</p>

    </details>
    <details>
      <summary>Can I do transactions without getting into smart contracts?</summary>
      <p>
        We strongly discourage you from trying to make direct trades, because that way you won’t have the escrow protection and are more vulnerable to getting scammed.
      </p>

    </details>
    <details>
      <summary>How do I get involved with the ezether community?</summary>
      <p>You’re welcome to join our slack channel here. We are keen to hear your feedback on the product, and if you’d like to be involved in user studies, please don’t hesitate to fill out this form.</p>

    </details>
  </div>

  const Security = () =>
    <div className='w-50-l w-100'>
      <h2>Security</h2>
      <details>
        <summary>How am I being protected from being scammed?</summary>
        <p>First, you keep ownership of your ether in your own wallet.</p>
        <p>Secondly, the seller puts the ether in escrow once he’s accepted a buy order. After that, in case the seller feels the buyer has not transferred money, or the buyer feels the seller is not acknowledging payment, then the transaction can be disputed and one of our appointed escrow agents will mediate a resolution.</p>
      </details>
    </div>


    const Operations = () =>
      <div className='w-50-l w-100'>
        <h2>Operations</h2>
        <details>
          <summary>How often is the advertisement price updated?</summary>
          <p>The price is updated every 10 seconds, ensuring that you get the most up-to-date price possible.</p>

        </details>
        <details>
          <summary>How much ether can I buy? Is there a limit per customer?</summary>
          <p>Unverified users have a trade limit of 5 ETH. Once your KYC verification is done, we don’t keep any limits on your trade.</p>

        </details>
        <details>
          <summary>What information do I need to give you to get verified with you?</summary>
          <p>For India, you need to upload your Aadhar card for verification.</p>

        </details>

      </div>

      const System = () =>
        <div className='w-50-l w-100'>
          <h2>System</h2>
          <details>
            <summary>What’s the difference between an online trade and a cash trade?</summary>
            <p>Online trades are expected to take place with money transferred to the sellers’ bank account or wallet. You can expect some time gap for a first time online payment for benificiary verification to take place with the buyers’ bank. </p>

          </details>
          <details>
            <summary>How do I verify that the payment I’ve recieved in my bank account is made by the buyer?
            </summary>
            <p>A unique transaction string is provided to be attached to each bank transfer, which can be verified in the bank statement.</p>
            <p>Please remember to add this transaction string, it speeds up resolution in case of dispute.
            </p>
          </details>
          <details>
            <summary>How does the feedback system work?</summary>
            <p>Once a transaction has been successfully conducted, you can give a rating to your experience with that particular buyer or seller.</p>
            <p>Both parties give each other stars out of five. This provides both parties motivation to act professionally, because a poor rating would reduce your credibility in the community.</p>
          </details>
          <details>
            <summary>What can I do if I feel that the rating is not fair?</summary>
            <p>We encourage users to accept their ratings and look at their own conduct during a transaction. However, if you think someone’s rating is excessively harsh, you can contact support with transaction ID, and we’ll see what to do.</p>

          </details>
          <details>
            <summary>Can you notify me in my browser when the next stage of a trade is started?</summary>
            <p>Yes, the dashboard offers a link for that. Once you accept the prompt in your browser, you’ll be notified in situations such as buyer marked payment as paid, or seller accepted transaction.</p>

          </details>
          <details>
            <summary>I’m logging in from another browser. How do I access my metamask account?</summary>
            <p>You can recover access via the private keys and wallet seeds that you’ve backed up.</p>

          </details>
          <details>
            <summary>How do I backup my private key or wallet seed?
            </summary>
            <p>Please refer to this section in our Getting Started guide. We highly recommend that you do this before making any transactions.</p>

          </details>
          <details>
            <summary>How are the fees in a transaction calculated?</summary>
            <p>
              The seller pays 1% in ETH on top of the amount that the buyer has entered. Some negligible gas fee will also go into the transaction, in order to send your transaction to the blockchain.

            </p>

          </details>
          <details>
            <summary>How do I report a bug in the system?</summary>
            <p>You’re an angel! We’re keen to fix any bugs, and you’re welcome to join our slack channel, or just contact support with details of any bug that you observe.</p>

          </details>

        </div>

        const Glossary = () =>
          <div className='w-50-l w-100'>
            <h2>Glossary</h2>
            <details>
              <summary>Ethereum</summary>
              <p>Ethereum is a world-wide network of computers, who contribute their computational power in exchange for a reward of Ether(ETH) tokens. </p>

            </details>
            <details>
              <summary>Ether
              </summary>
              <p>Ether (ETH) is the fuel for the Ethereum network, the medium through which you pay for the computational power to achieve your own goals.</p>

            </details>
            <details>
              <summary>Blockchain</summary>
              <p>Blockchain technology is a method to get many different persons to create one common version of something when doing things on the internet. This is done using cryptography, game theory and ensures that people can reach a consensus on something - the basis for most transactions in the world.</p>

            </details>
            <details>
              <summary>Address</summary>
              <p>If you want to send or receive Ether or Tokens on Ethereum, you will need an account. Ethereum accounts and contracts have what is called a public address that are 42 characters long and always start with a 0x.</p>
              <p>A typical Ethereum address looks something like this:  <code>0x88d221E36A68B19dd8aD1a5d4c21bE41a6d47b57</code></p>
            </details>


            <details>
              <summary>Smart contract</summary>
              <p>A regular contract is a program written in legal language and enforced by a court. A smart contract is a program written in code and executed by computers dependent on certain conditions being met. </p>
              <p>Smart contracts have faster resolution, and enforce their rules automatically when certain rules are met, eliminating the need for middle men.</p>
            </details>
            <details>
              <summary>Gas fee</summary>
              <p>When you send tokens, interact with a contract, send ETH, or do anything else on the the network, you must pay a small amount for that transfer. This is known as gas, and is the cost of putting your contract on the blockchain.</p>

            </details>
            <details>
              <summary>Wei
              </summary>
              <p>The smallest divisible unit of Ether, equal to one billionth of one billionth of an Ether.
              </p>

            </details>
            <details>
              <summary>Transaction limit</summary>
              <p>
                In order to comply with the laws of the country you’re trading in, we’ve placed a cap of 5 ETH for unverified users. Once you get your identity verification done, you’re free to trade as much Ether as you want.

              </p>

            </details>
            <details>
              <summary>Metamask</summary>
              <p>Metamask is a browser extension, that allows us to use the power of the Ethereum network for transactions without having to download 100GB+ blockchains, or spending computational power.</p>
              <p>Metamask is gaining widespread support as the safest way to store your ether with yourself, and will integrate very smoothly with future Ethereum applications.</p>
            </details>

            <details>
              <summary>Seed phrase</summary>
              <p>Since both the private keys and ether addresses are long and complex, a seed phrase is a squence of words you can remember that will restore access to your wallet in case something goes wrong.</p>

            </details>
            <details>
              <summary>Private key</summary>
              <p>Your private key, not to confuse with your metamask password, is the ultimate key to your Ether account. While your address is the public facing part of your account, your private key, is meant to be known only by you and you alone.</p>
              <p>Please be careful to not share your private key with anybody else.
              </p>
            </details>
            <details>
              <summary>Transaction ID</summary>
              <p>Every transaction is given a unique, randomly generated number to help identify it. This helps speed up the support process, and eliminated confusion when there are lots of transactions to be dealt with.</p>

            </details>
            <details>
              <summary>Transaction keyphrase</summary>
              <p>This helps the buyer prove that they’ve sent the money for the relevant transaction ID, and for the seller to confirm that the payment in their bank records is from the buyer.
              </p>
            </details>
            <details>
              <summary>Etherscan</summary>
              <p>Etherscan is a block explorer, that helps you check on the blockchain whether you’ve sent or received the Ether or not. The data on the blockchain is considered sacrosanct, because it’s nearly impossible to change the data once it’s been written there.
              </p>
            </details>
          </div>
