import React, { Component } from 'react'
import WrongAccount from '../layouts/wrongaccount/WrongAccount'
import LockedAccount from '../layouts/lockedaccount/LockedAccount'


class AccountWatcher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: this.props.web3,
      account: this.props.account,
      user: this.props.user,
      interval: null
    }
  }

  componentWillMount() {
    var interval = setInterval(() => {
      if (this.props.web3.data.eth.accounts[0] !== this.props.account.data) {
        console.log('AccountWatcher');
        console.log('this.props.account: ' + this.props.account.data);
        console.log('accounts[0]' + this.props.web3.data.eth.accounts[0]);
        this.props.accountUpdated(this.props.web3.data.eth.accounts[0])
        if(this.props.user.data && this.props.web3.data.eth.accounts[0]) {
          this.props.checkBrowserWalletAddress(this.props.user, this.props.web3.data.eth.accounts[0]);
        }
      }
    }, 1000);
    this.setState({interval: interval})
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('nextProps: ');
    console.log(nextProps);
    console.log('nextState');
    console.log(nextState);
  }


  render() {
    if(this.props.user.data && !this.props.account.data) {
      return(<LockedAccount />)
    }
    if(this.props.user.data && this.props.user.data.uid && !this.props.user.correctUserAccount) {
      return (<WrongAccount />)
    }
    return(<span></span>
    )
  }
}

export default AccountWatcher
