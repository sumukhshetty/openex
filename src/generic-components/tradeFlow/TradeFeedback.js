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
    console.log(e)
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
            <span value="1">☆</span><span value="2">☆</span><span value="3">☆</span><span value="4">☆</span><span value="5">☆</span>
          </div>
        </form>
        </div>
        <TrustButton />
        <BlockButton />
      </div>
    );
  }
}

export default TradeFeedback;
