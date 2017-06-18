const initialState = {
  data: null,
  userInfo: null,
  error:null,
  currency: 'USD',
  profile:null,
  correctUserAccount: true
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED' || action.type === 'USER_SIGNED_UP' )
  {
    return Object.assign({}, state, {
      data: action.payload,
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null,
      profile: null
    })
  }
  if (action.type === 'GET_USER_PROFILE'){
    return Object.assign({}, state, {
      profile: action.payload
    })
  }
  if (action.type === 'USER_SIGNED_UP_ERROR')
  {
    return Object.assign({}, state, {
      data: null,
      error: action.payload
    })
  }
  if (action.type === 'USER_LOGGED_IN_ERROR')
  {
    return Object.assign({}, state, {
      data: null,
      error: action.payload
    })
  }
  if(action.type === 'GET_USER_INFO')
  {
    return Object.assign({}, state, {
      userInfo: action.payload
    })
  }
  if(action.type === 'CLEAR_USER_INFO')
  {
    return Object.assign({}, state, {
      userInfo: null
    })
  }
  if (action.type === 'UPDATE_CORRECT_USER_ACCOUNT')
  {
    return Object.assign({}, state, {
      correctUserAccount: action.payload
    })
  }

  return state
}

export default userReducer
