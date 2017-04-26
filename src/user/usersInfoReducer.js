const initialState = {
  usersInfo: {}
}

const usersInfoReducer = (state = initialState, action) => {
  if (action.type === 'GET_USERS_INFO')
  {
    console.log('usersInfoReducer');
    console.log(action.id);
    console.log(action.payload);
    return {
      usersInfo: {...state.usersInfo,
                        [action.id]: action.payload}
    }
  }

  return state

}

export default usersInfoReducer
