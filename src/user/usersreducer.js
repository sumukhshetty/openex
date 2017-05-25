const initialState = {
  data: null,
}

const usersReducer = (state = initialState, action) => {
  if (action.type === 'GET_USERS')
  {
    return Object.assign({}, state, {
      data: action.payload,
    })
  }
  return state
}

export default usersReducer