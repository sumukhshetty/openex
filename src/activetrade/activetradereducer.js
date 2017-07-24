const initialState = {
  data: {},
  confirmTradeButtonIsDisabled: false,
  confirmTradeButtonColor: '#2196f3'
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
      confirmTradeButtonIsDisabled: action.payload,
      confirmTradeButtonColor: state.confirmTradeButtonColor
    }
  }
  if (action.type === 'UPDATE_CONFIRM_BUTTON_COLOR'){
    return {
      data: state.data,
      confirmTradeButtonIsDisabled: state.confirmTradeButtonIsDisabled,
      confirmTradeButtonColor: action.payload
    }
  }
  return state
}

export default activeTradeReducer
