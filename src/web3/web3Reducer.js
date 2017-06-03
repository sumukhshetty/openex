import Web3 from 'web3'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)

const initialState = {
  web3: web3,
  locked: true,
  wrongnetwork: true,
  orderBookFactory: null
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === "WEB_3_INITIALIZE")
  {
    return Object.assign({}, state, {
      web3: action.payload
    })
  }
  if (action.type === 'GET_BROWSER_WALLET_LOCK_STATUS')
  {
    return Object.assign({}, state, {
      locked:action.payload
    })
  }
  if (action.type === 'GET_WRONG_NETWORK_STATUS')
  {
    return Object.assign({}, state, {
      wrongnetwork:action.payload
    })
  }
  if (action.type === "ORDER_BOOK_FACTORY")
  {
    return Object.assign({}, state, {
      orderBookFactory: action.payload
    })
  }

  return state
}

export default web3Reducer
