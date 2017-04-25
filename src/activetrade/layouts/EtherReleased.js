import React, { Component } from 'react';
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo';
import Progress from '../../generic-components/tradeFlow/Progress';
import ChatBox from '../../generic-components/chatbox/ChatBox';

import TradeFeedbackContainer from '../../generic-components/tradeFlow/TradeFeedback';


class EtherReleased extends Component {
  render () {

    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveTradeInfo params={this.props.params} />
          <Progress progress_map={this.props.progress_map} />
          <div className='flex'>
            <ChatBox/>
            <div className='w-50 ma3'>
              <TradeFeedbackContainer />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default EtherReleased;
