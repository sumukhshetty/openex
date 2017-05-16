const initialState = {
  data: null
}

const etherPriceReducer = (state = initialState, action) => {
  if (action.type === "GET_ETHER_PRICE")
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  return state
}

export default etherPriceReducer
