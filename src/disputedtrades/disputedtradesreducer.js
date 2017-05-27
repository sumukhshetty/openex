const initialState = {
  data: null
}

const disputedTradesReducer = (state = initialState, action) => {
  if (action.type === 'SET_DISPUTED_TRADES')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default disputedTradesReducer
