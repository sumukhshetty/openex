const initialState = {
  buyorders: null
}

const buyOrderReducer = (state = initialState, action) => {
  if (action.type === 'GET_BUY_ORDERS')
  {
    return Object.assign({}, state, {
      buyorders: action.payload
    })
  }
  if (action.type === 'RECEIVE_BUY_ORDERS_DATA')
  {
    return Object.assign({}, state, {
      buyorders: action.payload
    })
  }

  return state
}

export default buyOrderReducer
