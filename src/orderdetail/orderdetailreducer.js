const initialState = {
  data: null
}

const orderDetailReducer = (state = initialState, action) => {
  if (action.type === 'GET_ORDER')
  {
    return Object.assign({}, state, {
      orderDetail: action.payload
    })
  }

  return state
}

export default orderDetailReducer
