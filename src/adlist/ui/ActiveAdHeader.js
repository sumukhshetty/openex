import React, { Component } from 'react';

export default class ActiveAdHeader extends Component {
  render () {
    return (
      <thead>
        <tr>
          <th className='fb5 tc'>ID</th>
          <th className='fb10 tc'>Status</th>
          <th className='fb10 tc'>Info</th>
          <th className='fb10 tc'> Balance</th>
          <th className='fb10 tc'>Country</th>
          <th className='fb10 tc'>Method</th>
          <th className='fb10 tc'>Limits</th>
          <th className='fb15 tc'>&nbsp;</th>
        </tr>
      </thead>
    );
  }
}
