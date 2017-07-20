const initialState = {
  purchaserequests: null
}

const adminReducer = (state = initialState, action) => {
  if (action.type === 'GET_PURCHASE_REQUESTS')
  {
    return Object.assign({}, state, {
      purchaserequests: action.payload
    })
  }

  if (action.type === 'CLEAR_PURCHASE_REQUESTS')
  {
    return Object.assign({}, state, {
      purchaserequests: null
    })
  }

  return state
}

export default adminReducer
