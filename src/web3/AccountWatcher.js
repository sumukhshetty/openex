import React, { Component } from 'react'


class AccountWatcher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: this.props.web3
    }
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.web3.data.eth.accounts[0] !== this.props.web3.account) {
        this.props.accountUpdated(this.props.web3.data.eth.accounts[0])
      }
    }, 100);
  }
  render() {
    return(<span></span>
    )
  }
}

export default AccountWatcher
