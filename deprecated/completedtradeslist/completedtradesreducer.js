const initialState = {
  data: null
}

const completedTradeReducer = (state = initialState, action) => {
  if (action.type === 'GET_COMPLETED_TRADES')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default completedTradeReducer
