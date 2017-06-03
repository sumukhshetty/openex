const initialState = {
  userOrderBook: null,
  sellerOrderBook: null
}

const orderBookReducer = (state = initialState, action) => {
  if (action.type === "USER_ORDER_BOOK")
  {
    return Object.assign({}, state, {
      userOrderBook: action.payload
    })
  }

  return state
}

export default orderBookReducer
