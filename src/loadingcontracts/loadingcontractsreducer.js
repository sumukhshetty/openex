const initialState = {
  data: 'init'
}

const loadingContractsReducer = (state = initialState, action) => {
  if (action.type === "UPDATE_LOADING_CONTRACTS_STATUS")
  {
    console.log('loadingContractsReducer.UPDATE_LOADING_CONTRACTS_STATUS')
    console.log(action.payload)
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  return state
}

export default loadingContractsReducer
