const initialState = 'init'

const cancelTradeReducer = (state = initialState, action) => {

  if (action.type === 'CANCEL_TRADE_STATE')
  {
    return action.payload
  }

  return state
}

export default cancelTradeReducer
