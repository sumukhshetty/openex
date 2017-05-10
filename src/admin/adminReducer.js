const initialState = {
  disputedTrades: null
}

const disputedTradeReducer = (state = initialState, action) => {
  if (action.type === 'GET_DISPUTED_TRADES') {
    return Object.assign({}, state, {
      disputedTrades: action.payload
    })
  }
  return state
}

export default disputedTradeReducer
