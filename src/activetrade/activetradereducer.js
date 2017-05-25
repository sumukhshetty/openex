// ISSUE-231-48: move this to the activetrade directory

const initialState = {
  data: {}
}

const activeTradeReducer = (state = initialState, action) => {
  if (action.type === 'GET_ACTIVE_TRADE') {
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
