const initialState = {
  sellOrder: null
}

const buyTradeOrderReducer = (state = initialState, action) => {
  if (action.type === 'GET_SELL_ORDER')
  {
    return Object.assign({}, state, {
      sellOrder: action.payload
    })
  }

  return state
}

export default buyTradeOrderReducer
