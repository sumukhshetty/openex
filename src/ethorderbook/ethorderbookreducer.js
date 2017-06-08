const initialState = {
  data: null
}

const ethOrderBookReducer = (state = initialState, action) => {
  if (action.type === 'SET_ETH_ODER_BOOK')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'CLEAR_ETH_ORDER_BOOK')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default ethOrderBookReducer
