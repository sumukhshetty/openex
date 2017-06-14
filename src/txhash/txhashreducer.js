const initialState = {
  data: null
}

const txHashReducer = (state = initialState, action) => {
  if (action.type === 'SET_TX_HASH')
  {
    console.log("txHashReducer.SET_TX_HASH")
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  if (action.type === 'CLEAR_TX_HASH')
  {
    return Object.assign({}, state,{
      data: null
    })
  }
  return state
}

export default txHashReducer
