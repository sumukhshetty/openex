/*const contract = require('truffle-contract')
import ETHOrderBookContract from '../../contracts/abi/ETHOrderBook.json'

export const USER_ORDER_BOOK = 'USER_ORDER_BOOK'
function userOrderBook(orderBook) {
  return {
  type: USER_ORDER_BOOK,
  payload: orderBook
  }
}

export function loadUserOrderBook(web3, orderBookAddress) {
  return function(dispatch) {
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
      dispatch(userOrderBook(null))
    }

  }
}

export function clearOrderBook() {
  return function(dispatch) {
    dispatch(userOrderBook(null))
  }
}
*/