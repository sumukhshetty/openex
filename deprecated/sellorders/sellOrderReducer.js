const initialState = {
  sellorders: null
}

const sellOrderReducer = (state = initialState, action) => {
  if (action.type === 'GET_SELL_ORDERS')
  {
    return Object.assign({}, state, {
      sellorders: action.payload
    })
  }
  if (action.type === 'RECEIVE_SELL_ORDERS_DATA')
  {
    return Object.assign({}, state, {
      sellorders: action.payload
    })
  }

  return state
}

export default sellOrderReducer
