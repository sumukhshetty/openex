const initialState = {
  data: null
}

const verifyWalletReducer = (state = initialState, action) => {
  if (action.type === "USER_ETH_ORDER_BOOK")
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  return state
}

export default verifyWalletReducer
