const initialState = {
  data: {}
}

const activeTradeReducer = (state = initialState, action) => {
  if (action.type === 'SET_ACTIVE_TRADE') {
    console.log("activeTradeReducer.SET_ACTIVE_TRADE")
    console.log(action.payload)
    return {
      data: action.payload
    }
  }
  if (action.type === 'CLEAR_ACTIVE_TRADE') {
    return {
      data: null
   }
  }
  return state
}

export default activeTradeReducer
