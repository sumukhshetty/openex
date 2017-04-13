import React, { Component } from 'react';
import PaperClip from '../../images/svgReactComponents/PaperClip.js';

class NewChatMessage extends Component {
  render () {
    return (
      <div className='flex cxc bg-white br2'>
        <PaperClip className='ph3 dim' />
        <input type='text' placeholder='Type your message ...' className=' w-100 bn fsmall' />
        <p className='green me fsmall ph3 dim pointer'>
          Send
        </p>
      </div>
    );
  }
}

export default NewChatMessage;
