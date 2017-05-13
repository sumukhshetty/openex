const initialState = {
  data: null
}

const enableNotificationsReducer = (state = initialState, action) => {
  if (action.type === 'ENABLE_NOTIFICATIONS')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'DONT_SHOW_AGAINN')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  return state
}

export default enableNotificationsReducer
