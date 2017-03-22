import React, { Component } from 'react'
import tick from '../../images/tick.svg'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-2-3">
            <div className="usp">
              <h1>Buy, Sell and Trade Ether Online</h1>
              <span>Quick, Secure and Decentralized</span>
            </div>
          </div>

          <div className="pure-u-1-3">
            <div className="ethereum-automte">
              <section>
                <h3>Sign Up</h3>
                <span className="switcher">
                  <a href="#">Switch Accounts</a>
                </span>
              </section>
              <section className="metamask">
                <div className="ethereum-wallet-id gradient">
                  0x98d87e87d7e78ed78b787a87b8aaaD878e
                </div>
                <div className="check-mark"><img src={tick} alt="" /></div>
              </section>
              <section className="signup-form">
                <form action="#" className="pure-form">
                  <input name="email" type="email" placeholder="Email address" />
                  <input name="username" type="text" placeholder="Username" />
                  <select name="country" id="name">
                    <option value="--">Select Country</option>
                    <option value="India">India</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                  <button type="submit" className="pure-button pure-button-primary spaced-button gradient right">
                    Sign up &rarr;
                  </button>
                </form>
              </section>
              <footer>
                <a href="#">Having trouble?</a>
              </footer>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
