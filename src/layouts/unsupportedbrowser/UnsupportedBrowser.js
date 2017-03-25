import React, { Component } from 'react'
//TODO import HelpContainer

class UnsupportedBrowser extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h3>You seem to be using an unsupported browser</h3>
            <p>To get the most out of using the Automte Ether Exchange please login to the new experinence with a supported browser</p>
            <div>
              Internet Explorer
            </div>
            <div>
              Chrome
            </div>
            <div>
              Firefox
            </div>
            <div>
              Safari
            </div>
            <div>
              Opera
            </div>
            <div>
              <button> Got it </button>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default UnsupportedBrowser
