const initialState = {
  data: null
}

const notificationsReducer = (state = initialState, action) => {
  if (action.type === 'GET_USER_NOTIFICATIONS')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'CLEAR_USER_NOTIFICATIONS')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default notificationsReducer
