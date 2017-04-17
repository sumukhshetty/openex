import React, { Component } from 'react';
import ActiveTradeInfo from '../../generic-components/tradeFlow/ActiveTradeInfo';
import Progress from '../../generic-components/tradeFlow/Progress';
import ChatBox from '../../generic-components/chatbox/ChatBox';
import CancelTrade from '../../generic-components/tradeFlow/CancelTrade';
import StepNote from '../../generic-components/tradeFlow/StepNote';
import Dot from '../../images/svgReactComponents/Dot.js';
import { Link } from 'react-router';

class ReviewActiveTrade extends Component {

  constructor (props) {
    super(props);
    this.state = {
      type: 'Seller'
    };
  }

  render () {
    const progress_map = [
      { status: 'completed', label: '', text: 'Seller Confirmed Transaction' },
      { status: 'active', label: <Dot/>, text: 'Awaiting Payment' },
      { status: '', label: '', text: 'Awaiting Release' },
      { status: '', label: '', text: 'All Done' }
    ];

    const step = this.state.type === 'Seller' ? 'Release Ether' : 'In Escrow';
    // NOTE / TODO: above variables hold mock data

    return (
      <section className='bg-smoke'>
        <div className='w-75 center'>
          <ActiveTradeInfo params={this.props.params} />
          <Progress progress_map={progress_map} />
          <div className='flex'>
            <ChatBox/>
            <div className='w-50 ma3'>
              <StepNote step={step} />
              {this.state.type == 'Seller' && this.props.viewerRole == "buyer" &&
               <div className='tc'>
                 <button onClick={this.props.confirmPayment}>
                   Mark Payment Complete
                 </button>
               </div>}
              <CancelTrade />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ReviewActiveTrade;
