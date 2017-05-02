const initialState = {
  completedTrades: null
}

const completedTradeListReducer = (state = initialState, action) => {
  if (action.type === 'GET_COMPLETED_TRADES')
  {
    return Object.assign({}, state, {
      completedTrades: action.payload
    })
  }

  return state
}

export default completedTradeListReducer
