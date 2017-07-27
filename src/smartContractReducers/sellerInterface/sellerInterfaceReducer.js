const initialState = {
  data: null
}

const sellerInterfaceReducer = (state = initialState, action) => {
  if (action.type === 'SET_SELLER_INTERFACE')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'CLEAR_SELLER_INTERFACE')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default sellerInterfaceReducer
