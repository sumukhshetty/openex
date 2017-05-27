const initialState = 'init'

const etherSendReducer = (state = initialState, action) => {

  if (action.type === 'ETHER_SEND_STATE')
  {
    return action.payload
  }

  return state
}

export default etherSendReducer
