const initialState = {
  data: null
}

const orderDBReducer = (state = initialState, action) => {
  if (action.type === 'ORDERDB')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'CLEAR_ORDERDB')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default orderDBReducer
