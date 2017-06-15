import * as contractAbis from './../../contract_addresses/contractAbi'

function setOrderBookFactory(orderBookFactory) {
  return {
  type: 'ETH_ORDER_BOOK_FACTORY',
  payload: orderBookFactory
  }
}

module.exports = {
  loadOrderBookFactory: (web3, orderBookFactoryAddress) => (dispatch) => {
    dispatch(setOrderBookFactory('obtaining...'))
    try {
      const OrderBookFactory = web3.eth.contract(contractAbis.OrderBookFactoryAbi)
      const _orderBookFactory = OrderBookFactory.at(orderBookFactoryAddress)
      dispatch(setOrderBookFactory(_orderBookFactory))

    } catch(error) {
      console.log('ui.VerifyWalletActions.loadOrderBookFactory.catch')
      console.log(error)
      dispatch(setOrderBookFactory(null))
    }
  }
}