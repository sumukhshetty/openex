const initialState = {
  data: null
}

const disputedTradesReducer = (state = initialState, action) => {
  if (action.type === 'GET_DISPUTED_TRADES')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default disputedTradesReducer
