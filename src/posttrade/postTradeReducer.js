const initialState = {
  data: null
}

const postTradeReducer = (state = initialState, action) => {
  if (action.type === 'POST_TRADE')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default postTradeReducer
