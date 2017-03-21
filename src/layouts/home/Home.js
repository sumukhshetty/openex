import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1">
            <h1>Good to Go!</h1>
            <p>Welcome to Automte</p>
            <h3>Further Reading</h3>
            <p>The React/Redux portions of the authentication fuctionality are provided by <a href="https://github.com/mjrussell/redux-auth-wrapper" target="_blank">mjrussell/redux-auth-wrapper</a>.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
