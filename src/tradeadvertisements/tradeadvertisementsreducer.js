const initialState = {
  data: null
}

const tradeAdvertisementsReducer = (state = initialState, action) => {
  if (action.type === 'GET_TRADE_ADVERTISEMENTS')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default tradeAdvertisementsReducer
