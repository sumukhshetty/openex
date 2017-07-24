const initialState = {
  data: 'USD'
}

const currencyReducer = (state = initialState, action) => {
  if (action.type === 'SET_CURRENCY')
  {
    console.log('countryReducer.SET_CURRENCY')
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default currencyReducer
