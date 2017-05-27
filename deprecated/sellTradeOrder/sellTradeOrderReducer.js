const initialState = {
  buyOrder: null
}

const buyTradeOrderReducer = (state = initialState, action) => {
  if (action.type === 'GET_BUY_ORDER')
  {
    return Object.assign({}, state, {
      buyOrder: action.payload
    })
  }

  return state
}

export default sellTradeOrderReducer
