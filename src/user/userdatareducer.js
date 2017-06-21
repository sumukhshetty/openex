const initialState = {
  data: false
}

const userDataReducer = (state = initialState, action) => {
  if (action.type === 'GET_REDUX_STORE')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default userDataReducer
