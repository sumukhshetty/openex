// ISSUE-231-8: activeAds should be changed to data
const initialState = {
  activeAds: null
}

const adListReducer = (state = initialState, action) => {
  if (action.type === 'GET_ACTIVE_ADS')
  {
    return Object.assign({}, state, {
      activeAds: action.payload
    })
  }

  return state
}

export default adListReducer
