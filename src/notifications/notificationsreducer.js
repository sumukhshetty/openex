const initialState = {
  data: null
}

const notificationsReducer = (state = initialState, action) => {
  if (action.type === 'GET_USER_NOTIFICATIONS') {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default notificationsReducer
