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

  return state
}

export default sellOrderContractReducer
