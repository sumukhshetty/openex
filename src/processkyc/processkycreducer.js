const initialState = {
  data: null
}

const processKycReducer = (state = initialState, action) => {
  if (action.type === 'SET_PROCESS_KYC')
  {
    console.log('processKycReducer.SET_PROCESS_KYC')
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  if (action.type === 'CLEAR_PROCESS_KYC')
  {
    return Object.assign({}, state, {
      data: null
    })
  }
  return state
}

export default processKycReducer
