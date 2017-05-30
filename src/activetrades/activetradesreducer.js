const initialState = {
  data: null
}

const activeTradesReducer = (state = initialState, action) => {
  if (action.type === 'GET_ACTIVE_TRADES')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default activeTradesReducer
