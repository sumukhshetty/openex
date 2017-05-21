const initialState = {
  data: null
}

const buyTradeAdvertisementsReducer = (state = initialState, action) => {
  if (action.type === 'GET_BUY_TRADE_ADVERTISEMENTS')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default buyTradeAdvertisementsReducer
