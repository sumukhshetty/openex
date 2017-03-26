import React, { Component } from 'react'
import ProductShortDescription from './ProductShortDescription'
import SignUpContainer from './../../signup/SignUpContainer'

class HomeMain extends Component {
  render() {
    return(
      <main role="main">
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-2-3">
              <ProductShortDescription />
            </div>

            <div className="pure-u-1-3">
              <SignUpContainer/>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default HomeMain;
