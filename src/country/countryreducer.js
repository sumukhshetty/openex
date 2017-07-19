const initialState = {
  data: null
}

const countryReducer = (state = initialState, action) => {
  if (action.type === 'SET_COUNTRY_CODE')
  {
    console.log('countryReducer.SET_COUNTRY_CODE')
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default countryReducer
