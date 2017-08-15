import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class PostTradeInstructions extends Component {

  render () {
    return (
      <main className='measure-wide mv3'>
        <h1 className='b'>Create an ether trade advertisement</h1>
        <p>
              Create an ether trade advertisement if you plan to trade ether regularly. We recommend clicking on buy or sell if you want to trade quicker.
            </p>
        <p>
              For each completed trade, advertisers pay 1% of the amount in fees.
            </p>
        <p>
              Before setting up your advertisement please read through our <a onClick={()=>browserHistory.push("termsofservice")}>terms of service</a> and online sale advertisement guide.
            </p>
      </main>
    );
  }
}

export default PostTradeInstructions;
