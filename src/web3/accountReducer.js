const initialState = {data: null}

const accountReducer = (state = initialState, action) => {
  if (action.type === "UPDATE_ACCOUNT")
  {
    console.log('accountReducer.UPDATE_ACCOUNT');
    console.log('payload: ' + action.payload);
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default accountReducer
