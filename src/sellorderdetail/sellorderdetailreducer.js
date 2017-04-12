const initialState = {
  sellOrder: null
}

const sellOrderDetailReducer = (state = initialState, action) => {
  if(action.type === 'CLEAR_SELL_ORDER')
  {
    console.log('clearing sellOrder state');
    return initialState;
  }
  if (action.type === 'GET_SELL_ORDER')
  {
    console.log('in sellorder reducer');
    console.log(action.payload);
    return Object.assign({}, state, {
      sellOrder: action.payload
    })
  }

  return state
}

export default sellOrderDetailReducer
