const contract = require('truffle-contract')
import ETHOrderBookContract from './../../../contracts/abi/ETHOrderBook.json'


function setWalletVerifiedStatus(verifiedBool){
  return {
    type: 'SET_BROWSER_WALLET_VERIFIED_STATUS',
    payload: verifiedBool
  }
}

function userOrderBook(orderBook) {
  return {
  type: 'USER_ETH_ORDER_BOOK',
  payload: orderBook
  }
}

module.exports = {
  verifyWallet: (result) => (dispatch) => {
    dispatch(setWalletVerifiedStatus(result))
  },
  loadUserOrderBook: (web3, orderBookAddress) => (dispatch) => {
    dispatch(userOrderBook('obtaining...'))
    try {
      const orderBook = contract(ETHOrderBookContract);
      orderBook.setProvider(web3.currentProvider);
      var orderBookInstance;
      orderBook.at(orderBookAddress)
        .then(function (_orderBook) {
          dispatch(userOrderBook(_orderBook))
        })
    } catch(error) {
      console.log("ui.VerifyWalletActions.verifyWallet.loadUserOrderBook.error")
      console.log(error)
      dispatch(userOrderBook(null))
    }
  }
}