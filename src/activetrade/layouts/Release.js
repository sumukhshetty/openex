import React, { Component } from 'react';
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo';
import Progress from '../../generic-components/tradeFlow/Progress';
import ChatBox from '../../generic-components/chatbox/ChatBox';
import CancelTrade from '../../generic-components/tradeFlow/CancelTrade';
import DisputeTrade from '../../generic-components/tradeFlow/DisputeTrade';
import BuyerStepNote  from '../ui/BuyerStepNoteSell';
import SellerStepNote  from '../ui/SellerStepNoteSell';

class Release extends Component {

  render () {

    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveTradeInfo params={this.props.params} />
          <Progress progress_map={this.props.progress_map} />
          <div className='flex'>
            <ChatBox/>
            <div className='w-50 ma3'>
              {this.props.viewerRole === 'buyer' &&
              <BuyerStepNote step={this.props.step} />}
              {this.props.viewerRole === 'seller' &&
               <div>
               <SellerStepNote step={this.props.step} />
               <div className='tc'>
                 <button onClick={this.props.releaseEther}>
                   Release Ether
                 </button>
               </div>
               </div>}
              <CancelTrade />
              <DisputeTrade type='buyer' />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Release;
