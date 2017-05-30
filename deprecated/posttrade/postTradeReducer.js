// ISSUE-231-68: We don't really need this reducer to store anything
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
