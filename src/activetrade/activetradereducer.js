const initialState = {
  data: {},
  confirmTradeButtonIsDisabled: false
}

const activeTradeReducer = (state = initialState, action) => {
  if (action.type === 'SET_ACTIVE_TRADE') {
    return {
      data: action.payload
    }
  }
  if (action.type === 'CLEAR_ACTIVE_TRADE') {
    return {
      data: null
   }
  }
  if (action.type === 'UPDATE_CONFIRM_BUTTON_IS_DISABLED') {
    return {
      data: state.data,
      confirmTradeButtonIsDisabled: action.payload
    }
  }
  return state
}

export default activeTradeReducer
