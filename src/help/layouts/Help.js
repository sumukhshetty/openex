import React, { Component } from 'react';
// TODO import HelpContainer
import HelpForm from './HelpForm';

class Help extends Component {
  render () {
    return (
      <div className='bg-smoke'>
        <div className='w-75 center pv3'>
          <HelpForm />
        </div>
      </div>
    );
  }
}

export default Help;
