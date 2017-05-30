const initialState = {
  adData: {}
}

const adReducer = (state = initialState, action) => {

  if (action.type === 'GET_AD')
  {
    return {
      adData: {...state.adData,
                        [action.id]: action.payload}
    }
  }

  return state
}

export default adReducer
