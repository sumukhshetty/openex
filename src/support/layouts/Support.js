import React, { Component } from 'react';
// TODO import HelpContainer
import SupportForm from './SupportForm';

class Support extends Component {
  render () {
    return (
      <div className='bg-smoke'>
        <div className='w-75 center pv3'>
          <SupportForm />
        </div>
      </div>
    );
  }
}

export default Support;
