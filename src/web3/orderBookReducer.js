const initialState = {
  userOrderBook: null,
  sellerOrderBook: null,
  data: null
}

const orderBookReducer = (state = initialState, action) => {
  if (action.type === "USER_ORDER_BOOK")
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  return state
}

export default orderBookReducer
