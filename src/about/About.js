import React, { Component } from 'react';

class About extends Component {
  render () {
    return (
      <div className='w-100 bg-smoke vh-100'>
        <div className='w-75 center'>
          <div className='measure-wide mv3'>
          <p className='pv1'>
Bitcoin, the world's first true digital currency, has expanded our vision of possible innovation in financial transactions. The emerging field of blockchain technology owes its existence to Bitcoin's implementation of a distributed ledger.
</p>
<p className='pv1'>
Although Bitcoin has laid the groundwork, its limitations have justified the need for a new platform, Ethereum. By solving many of Bitcoin's issues, Ethereum has become a qualified contender for the next huge innovator in finance, and this is evident in the sharp increase in demand for its currency, Ether.
</p>
<p className='pv1'>
Although its demand is global, buying and selling Ether for the local currency in each country is still an issue, especially in emerging markets. Centralized exchanges such as Coinbase don't operate in most nations, charge high service fees, and require traders to keep Ether in the exchange's wallets. Obtaining Ether often becomes a matter of obtaining Bitcoin first, and then trading it for Ether, adding friction and extra fees to the transaction.
</p>
<p className='pv1'>
Localbitcoins is a great solution for bitcoin, but bitcoin in general is losing its charm because of the scaling issues they are facing.It takes me multiple days to get my money out of my localbitcoins account these days.
</p>
<p className='pv1'>
Ether has a clear vision on how they will solve these problems and they have outlined it in their roadmap.
</p>
<p className='pv1'>
Most people in the ecosystem already know about the exponential growth of the ethereum blockcain. This is a great article by codetract that explains the different hockey stick graphs in the ethereum ecosystem. With a market cap of over $7B we definitely believe that ether is here to stay.
</p>
<p className='pv1'>
A decentralized world would require a decentralized solution for buying ether, and we believe the solution should be a trading marketplace where people can exchange ether for fiat from people in their country.
</p>
<p className='pv1'>
Product:
To make this a reality, we are building Automte, a decentralized dapp built using the cutting edge decentralized stack.
We are the most secure solution because we at no point have access to your ether, we use metamask for wallet management and smart contracts for the escrows. So the only thing we can do is direct the funds to the honest party in case of a dispute. Metamask is a chrome plugin that allows you to make your chrome browser a decentralized browser and Metamask handles all the private keys locally on your device.
Most centralized exchanges handle your private keys, so they are vulnerable to hacks, even if they try to secure it in any way, all the hackers need to do is attack the weak point which is generally some sort of admin account that has access to all the private keys.
</p>
          </div>
        </div>
      </div>
    )
  }
}

export default About