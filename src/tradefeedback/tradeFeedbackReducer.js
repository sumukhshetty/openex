const initialState = {
  data: null
}

const tradeFeedbackReducer = (state = initialState, action) => {
  if (action.type === 'GET_TRADE_FEEDBACK')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  if (action.type === 'CLEAR_TRADE_FEEDBACK')
  {
    return Object.assign({}, state,{
      data: null
    })
  }
  return state
}

export default tradeFeedbackReducer
