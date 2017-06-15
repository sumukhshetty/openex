import React, { Component } from 'react'


class ETHOrderBook extends Component {

  componentWillUnmount() {
    this.props.clearETHOrderBook();
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('[ETHOrderBook] componentWillUpdate');
    if(nextProps.web3.data && nextProps.user.profile && !nextProps.orderBook.userOrderBook) {
      if(nextProps.web3.data.currentProvider && nextProps.user.profile.orderBookAddress) {
        console.log('calling loadETHOrderBook');
        this.props.loadETHOrderBook(nextProps.web3.data, nextProps.user.profile.orderBookAddress);
      }
    }
  }

  render() {
    return(
    <span></span>
    )
  }
}

export default ETHOrderBook
