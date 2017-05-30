const initialState = {
  data: null
}

const sellTradeAdvertisementsReducer = (state = initialState, action) => {
  if (action.type === 'GET_SELL_TRADE_ADVERTISEMENTS')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default sellTradeAdvertisementsReducer
