// deprecate this
const initialState = {
  data: null,
  event: null
}

const verifyWalletReducer = (state = initialState, action) => {
  if (action.type === "USER_ETH_ORDER_BOOK")
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  if (action.type === 'WATCH_ETH_ORDER_BOOK_EVENT'){
    return Object.assign({}, state, {
      event: action.payload
    })
  }
  return state
}

export default verifyWalletReducer
