const initialState = {
  data: null
}

const userPresenceReducer = (state = initialState, action) => {
  if (action.type === 'SET_USER_PRESENCE')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  return state
}

export default userPresenceReducer
