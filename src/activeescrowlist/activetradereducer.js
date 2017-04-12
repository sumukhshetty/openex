const initialState = {
  activeTradeData: []
}

const activeTradeReducer = (state = initialState, action) => {

  if (action.type === 'GET_ACTIVE_TRADE')
  {
    console.log('got active trade');
    console.log(action.payload);
    return {
        ...state,
        activeTradeData: [...state.activeTradeData, action.payload]
    }
  }

  return state
}

export default activeTradeReducer
