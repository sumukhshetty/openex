import React, { Component } from 'react';
import Block from '../../images/svgReactComponents/Block.js';

class BlockButton extends Component {
  render() {
    return (
      <div className='flex cxc bg-danger w5 white br2 pa2 mt4 grow pointer'>
        <Block className='mh2' />
        <p>
          Victoria Padilla
        </p>
      </div>
    )
  }
}

export default BlockButton