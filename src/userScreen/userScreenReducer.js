const initialState = {
  data: null
}

const userScreenReducer = (state = initialState, action) => {
  if (action.type === 'GET_USER_SCREEN')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  if (action.type === 'NULL_USER_SCREEN'){
    return Object.assign({}, state, {
      data: null
    })
  }
  return state
}

export default userScreenReducer
