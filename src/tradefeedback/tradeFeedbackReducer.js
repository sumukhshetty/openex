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

  return state
}

export default tradeFeedbackReducer
