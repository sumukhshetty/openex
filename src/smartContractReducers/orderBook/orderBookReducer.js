const initialState = {
  data: null
}

const orderBookReducer = (state = initialState, action) => {
  if (action.type === 'ORDERBOOK')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'CLEAR_ORDER_BOOK')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default orderBookReducer
