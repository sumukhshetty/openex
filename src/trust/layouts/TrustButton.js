import React, { Component } from 'react';
import Star from '../../images/Star.js';

class TrustButton extends Component {
  render() {
    return (
      <div className='flex cxc bg-blue w5 white br2 pa2 mt4 grow pointer'>
        <Star size={50} className='mh2' />
        <p>
          Trust Victoira Padilla
        </p> 
      </div>
    )
  }
}

export default TrustButton