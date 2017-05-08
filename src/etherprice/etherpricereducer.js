const initialState = {
  etherPrices: null
}

const etherPriceReducer = (state = initialState, action) => {
  if (action.type === "GET_ETHER_PRICE")
  {
    return Object.assign({}, state, {
      etherPrices: action.payload
    })
  }
  return state
}

export default etherPriceReducer
