const initialState = {
  data: null
}

const purchaseRequestsReducer = (state = initialState, action) => {
  if (action.type === 'GET_PURCHASE_REQUESTS')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default purchaseRequestsReducer
