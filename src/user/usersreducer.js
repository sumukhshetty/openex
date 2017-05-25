const initialState = {
  data: null,
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'GET_USERS')
  {
    return Object.assign({}, state, {
      data: action.payload,
    })
  }
  return state
}