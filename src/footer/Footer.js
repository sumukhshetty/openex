import React, { Component } from 'react'
import Region from './Region'
import Copyright from './Copyright'
import FooterTable from './FooterTable'

class Footer extends Component {
  render() {
    return(
      <footer className="page-footer">
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1-2">
              <Region/>
            </div>
            <div className="pure-u-1-2">
              <FooterTable/>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1 copyright">
              <Copyright/>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
