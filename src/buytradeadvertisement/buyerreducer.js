const initialState = {
  data: null
}

const buyerReducer = (state = initialState, action) => {
  if (action.type === 'SET_BUYER')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'CLEAR_BUYER')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default buyerReducer
