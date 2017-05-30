const initialState = {
  data: null
}

const sellerReducer = (state = initialState, action) => {
  if (action.type === 'SET_SELLER')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'CLEAR_SELLER')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default sellerReducer
