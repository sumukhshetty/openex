const initialState = {
  data: null
}

const ordersListReducer = (state = initialState, action) => {
  if (action.type === 'GET_ORDERS')
  {
    return Object.assign({}, state, {
      ordersList: action.payload
    })
  }

  return state
}

export default ordersListReducer
