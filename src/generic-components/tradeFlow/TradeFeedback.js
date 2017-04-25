import React, { Component } from 'react';
import Star from '../../images/Star.js';
import Block from '../../images/svgReactComponents/Block.js';
import TrustButton from './../../trust/layouts/TrustButton'
import BlockButton from './../../block/layouts/BlockButton'

class TradeFeedback extends Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
  }
  clickStar(e){
    console.log(e);
  }
  render () {
    return (
      <div className='measure pv4'>
        <p className='tc flarge b'>
          How would you rate this transaction?
        </p>
        <div className='flex col cxc' >
        <form onSubmit={this.handleSubmit} onClick={this.clickStar}>
          <div className='rating'>
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
        </form>
        <TrustButton />
        <BlockButton />
        </div>
      </div>
    );
  }
}

export default TradeFeedback;
