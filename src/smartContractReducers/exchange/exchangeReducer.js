const initialState = {
  data: null
}

const exchangeReducer = (state = initialState, action) => {
  if (action.type === 'EXCHANGE')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'CLEAR_EXCHANGE')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default exchangeReducer
