import React, { Component } from 'react';

class GettingStarted extends Component {
  render () {
    return (
      <div className='w-100 bg-smoke vh-100'>
        <div className='w-75 center'>
          <div className='measure-wide mv3'>

<h1 className='pv1'>Creating Advertisements</h1>
<p className='pv1'>
You can create advertisements to buy ether or to sell ether. We recommend that you only create one of each to not spam the marketplace. If you spam the marketplace with ads, we may deactivate your account. 
</p>
<p className='pv1'>
<ol>
<li>Go to Your Advertisements and click on Create Advertisement or on  the nav bar you can click on Post a trade</li>
<li>You then select Buy ether or sell ether depending on what you want to do</li>
<li>Add all the information accordingly one each of the boxes</li>
<li>Click on Publish advertisement and Voila ! Your ad is live on the exchange. You will be able to view and edit the ad on the dashboard under your advertisements.</li>
</ol>
</p>
<p className='pv1'>Location - Our system works on giving you local trade ads so we would require the location of where your ad is live. This would help you also find local buyers if you are looking for cash trades</p>
<p className='pv1'>Margin* - This the percentage above or below market that you want to buy or sell ether at. Enter in any valid integer. The price of the trade is calculated in real time by getting the price from the cryptocompare api. In the future we intend to offer more elegant pricing equations and various apis to choose from. You can change the margin at any time by editing the advertisement. Any trades that are created before the margin is updated will not be changed automatically.</p>
<p className='pv1'>Payment Method* - enter in the bank account information that you want people to deposit fiat into. This information will only be shared when you a confirm a trade. Alternatively, you can specify that you will share the bank information in Chat.</p>
<p className='pv1'>Min Transaction Limit - The minimum amount that you want to do for a transaction in your local currency</p>
<p className='pv1'>Max Transaction Limit - The maximum amount that you want to do for a transaction in your local currency</p>
<p className='pv1'>Terms of trade* - the terms of the trade that you want to communicate for a few examples see here</p>

<h1 className='pv1'>Installing metamask</h1>
<p className='pv1'>
<ol>
<li>Click <a traget="_blank" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">here</a> to go to the Chrome Webstore and get the MetaMask plugin</li>
<li>Click "Add to Chrome" to Install MetaMask as Google Chrome extension. </li>
<li>Click "Add Extension" to confirm and MetaMask will be added</li>
<li>Click the MetaMask logo</li>
<li>Read and agree to the MetaMask terms and Conditions</li>
<li>Click "Create a new vault”</li>
<li>Metamask will now show you your seed. It is very important that you copy and store those 12 words, without them you cannot restore your wallet. </li>
<li>Head to ezether.com and it should detect your wallet automatically.</li>
</ol>
</p>

<h1 className='pv1'>Edit trade.</h1>
<p className='pv1'>
<ol>
<li>Go to the Dashboard</li>
<li>Head to the Your Advertisements section</li>
<li>You will see an edit button to each of your trades</li>
<li>You now can edit the existing trade and change the details</li>
<li>Click on Publish Advertisement once all the changes are made</li>
</ol>
</p>

<h1 className='pv1'>Buy order flow</h1>
<p className='pv1'>
<ol>
<li>If you are looking to buy ether, click on the Buy tab on the nav bar</li>
<li>Multiple trades will be listed, look at whatever suits your needs in terms of limits, pricing, rating and past experience with trader</li>
<li>Click on the Buy button</li>
<li>Enter the amount of ether you want to buy in the box. It will convert that amount to INR. This is the amount you will have to transfer to the seller</li>
<li>Click on Send trade request. The seller will be notified.</li>
<li>It will redirect you to the dashboard, where your trade will be listed. Click on View/message</li>
<li>You will have to wait for the seller to confirm the transaction. Once he confirms the transaction it will move from ‘awaiting seller confirmation’ to  ‘awaiting payment’ 
</li>
<li>Transfer the amount to the sellers bank account. You can chat with the seller on the nav bar, and confirm with him about his bank details.
</li>
<li>The seller will then release the ether once the amount is deposited into his bank account.
</li>
<li>If the seller is holding your funds fraudulently, you can dispute the trade. Our customer support team will then look at your case, and then justly resolve the dispute </li>
</ol>
</p>

<h1 className='pv1'>Sell order flow</h1>
<p className='pv1'>
<ol>
<li>If you are looking to sell ether, click on the Sell tab on the nav bar</li>
<li>Multiple trades will be listed, look at whatever suits your needs in terms of limits, pricing, rating and past experience with trader</li>
<li>Click on the Sell button</li>
<li>Enter the amount of ether you want to sell in the box. It will convert that amount to INR. This is the amount the buyer will transfer to your bank account.</li>
<li>Click on Send trade request. The buyer will be notified.</li>
<li>It will redirect you to the dashboard, where your trade will be listed. Click on View/message</li>
<li>You will have to confirm the transaction (this step is necessary because a smart contract holds your funds). Once you confirm the transaction it will move from awaiting seller confirmation to  awaiting payment  </li>
<li>The buyer will then transfer the amount to your bank account. You can chat with the buyer on the chat box, and confirm details about the transaction with him</li>
<li>Once he completes payment, transaction will move to awaiting release. Once the money is in your account, you can click on release ether</li>
<li>If the buyer has fraudulently marked the payment complete you can initiate a dispute. Our customer support team will then look at your case, and then justly resolve the dispute</li>
</ol>
</p>

<h1 className='pv1'>Disputing trade</h1>
<p className='pv1'>
<ol>
<li>According to the state of the transaction, a dispute button will arise to the seller and buyer at different points of the transactions.</li>
<li>This button will be on the right side, right below instructions</li>
<li>Once you click it, the transactions will move to a state of dispute. In this state, neither the buyer nor the seller can make any more actions. </li>
</ol>
</p>

<h1 className='pv1'>Cancelling trade</h1>
<p className='pv1'>
<ol>
<li>Before the seller confirms the transaction, both parties can cancel the trade if they wish to. </li>
<li>The cancel trade button will be located on the right side below all the instructions.</li>
<li>Click on cancel trade, and the trade will move to completed trades section.</li>
</ol>
</p>

<h1 className='pv1'>Creating an account</h1>
<p className='pv1'>
<ol>
<li>First install metamask</li>
<li>Then head to ezether.com and fill up the signup form on the landing page. Click sign up once done.</li>
<li>Sign the transaction. That's about it. Your account has been created. </li>
</ol>
</p>


          </div>
        </div>
      </div>
    );
  }
}

export default GettingStarted