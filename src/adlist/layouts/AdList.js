import React, { Component } from 'react';

import AdListContainer from './../ui/AdListContainer';
import ActiveAdHeader from '../ui/ActiveAdHeader';

class AdList extends Component {
  render () {
    return (
      <div className='pt3'>
        <p className='b'>Your Advertisements</p>
        <table>
          <ActiveAdHeader />
          <AdListContainer />
        </table>
        <div className='flex mxe pv3'>
          <button className='grow'>+ Create Advertisement</button>
        </div>
      </div>
    );
  }
}

export default AdList;
