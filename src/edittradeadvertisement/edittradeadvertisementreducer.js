const initialState = {
  data: null
}

const editTradeAdvertisementReducer = (state = initialState, action) => {
  if (action.type === 'SET_EDIT_TRADE_ADVERTISEMENT')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'CLEAR_EDIT_TRADE_ADVERTISEMENT')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default editTradeAdvertisementReducer
