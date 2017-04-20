import React, { Component } from 'react';
import HomeMain from './HomeMain';
import BrowserDetection from 'react-browser-detection';

import UnsupportedBrowser from './../unsupportedbrowser/UnsupportedBrowser';
const browserHandler = {
  chrome: () => <HomeMain />,
  default: (browser) => <UnsupportedBrowser />
};

class Home extends Component {
  render () {
    return (
      <section className='home'>
        <div className='container'>
          <BrowserDetection>
            {browserHandler}
          </BrowserDetection>
        </div>
      </section>
    );
  }
}

export default Home;
