const initialState = {
  availableBalance: null,
  contractBalance: null
}

const manageContractReducer = (state = initialState, action) => {
  if (action.type === "SET_AVAILABLE_BALANCE")
  {
    console.log('manageContractReducer.SET_AVAILABLE_BALANCE')
    console.log(action.payload)
    return Object.assign({}, state, {
      availableBalance: action.payload
    })
  }
  if (action.type === 'SET_CONTRACT_BALANCE')
  {
    return Object.assign({}, state, {
      contractBalance: action.payload
    })
  }
  return state
}

export default manageContractReducer
