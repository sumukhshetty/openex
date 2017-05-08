const initialState = {
  activeTradeData: {}
}

const activeTradeReducer = (state = initialState, action) => {
  if (action.type === 'GET_ACTIVE_TRADE') {
    return {
      activeTradeData: {...state.activeTradeData,
        [action.id]: action.payload}
    }
  }
  return state
}

export default activeTradeReducer
