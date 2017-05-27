//delete this file
const initialState = {
  activeTrades: null
}

const activeEscrowListReducer = (state = initialState, action) => {
  if (action.type === 'GET_ACTIVE_TRADES')
  {
    return Object.assign({}, state, {
      activeTrades: action.payload
    })
  }

  return state
}

export default activeEscrowListReducer
