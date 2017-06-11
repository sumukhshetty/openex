const initialState = {
  data: null
}

const orderBookFactoryReducer = (state = initialState, action) => {
  if (action.type === "ETH_ORDER_BOOK_FACTORY")
  {
    console.log("orderBookFactoryReducer.ETH_ORDER_BOOK_FACTORY")
    console.log(action.payload)
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  return state
}

export default orderBookFactoryReducer
