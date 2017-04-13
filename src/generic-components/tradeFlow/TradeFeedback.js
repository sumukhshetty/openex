import React, { Component } from 'react';
import Star from '../../images/Star.js';
import Block from '../../images/svgReactComponents/Block.js';

class TradeFeedback extends Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
  }
  render () {
    return (
      <div className='measure pv4'>
        <p className='tc flarge b'>
          How would you rate this transaction?
        </p>
        <form className='flex col cxc' onSubmit={this.handleSubmit}>
          <div className='rating'>
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
          <div className='flex cxc bg-blue w5 white br2 pa2 mt4 grow pointer'>
            <Star size={50} className='mh2' />
            <p>
              Trust Victoira Padilla
            </p>
          </div>
          <div className='flex cxc bg-danger w5 white br2 pa2 mt4 grow pointer'>
            <Block className='mh2' />
            <p>
              Block Victoira Padilla
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default TradeFeedback;
