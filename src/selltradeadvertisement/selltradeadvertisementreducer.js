const initialState = {
  data: null
}

const sellTradeAdvertisementReducer = (state = initialState, action) => {
  if (action.type === 'SET_SELL_TRADE_ADVERTISEMENT')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'CLEAR_SELL_TRADE_ADVERTISEMENT')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default sellTradeAdvertisementReducer
