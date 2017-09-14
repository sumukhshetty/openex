import Web3 from 'web3'

//const provider = new Web3.providers.HttpProvider('http://localhost:8545')
// TODO change this to mainnet on launch
//const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/QmKbFq9RrJ0qz6zqSRPO'));
//const web3 = new Web3(provider)

const initialState = {
  data: null,
  locked: false,
  verified: false,
  wrongnetwork: true,
  orderBookFactory: null
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === "SET_WEB_3")
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  if (action.type === 'SET_BROWSER_WALLET_LOCK_STATUS')
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
  if (action.type === 'SET_BROWSER_WALLET_VERIFIED_STATUS')
  {
    return Object.assign({}, state, {
      verified:action.payload
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
