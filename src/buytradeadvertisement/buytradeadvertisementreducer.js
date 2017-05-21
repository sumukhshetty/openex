const initialState = {
  data: null
}

const buyTradeAdvertisementReducer = (state = initialState, action) => {
  if (action.type === 'SET_BUY_TRADE_ADVERTISEMENT')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'CLEAR_BUY_TRADE_ADVERTISEMENT')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default buyTradeAdvertisementReducer
