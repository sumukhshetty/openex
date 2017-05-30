const initialState = {
  sellOrderContract: null
}

const sellOrderContractReducer = (state = initialState, action) => {
  if (action.type === 'GET_BALANCE')
  {
    return Object.assign({}, state, {
      availableBalance: action.payload
    })
  }

  if (action.type === 'CLEAR_BALANCE')
  {
    return initialState
  }
  return state
}

export default sellOrderContractReducer
