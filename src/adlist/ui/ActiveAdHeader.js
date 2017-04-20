import React, { Component } from 'react';

export default class ActiveAdHeader extends Component {
  render () {
    return (
      <thead>
        <tr>
          <th className='fb5 tc'>#</th>
          <th className='fb15 tc'>Status</th>
          <th className='fb10 tc'>Info</th>
          <th className='fb15 tc'>Country</th>
          <th className='fb15 tc'>Payment Method</th>
          <th className='fb10 tc'>Price</th>
          <th className='fb10 tc'>Limits</th>
          <th className='fb10 tc'>&nbsp;</th>
        </tr>
      </thead>
    );
  }
}
