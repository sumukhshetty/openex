const initialState = {
  data: null
}

const ordersListReducer = (state = initialState, action) => {
  if (action.type === 'GET_BUY_ORDERS')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default ordersListReducer
