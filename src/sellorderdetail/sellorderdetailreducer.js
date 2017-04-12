const initialState = {
  sellOrder: null,
  contractInfo: null
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

  if (action.type === 'GET_SELL_ORDER_CONTRACT')
  {
    console.log('in sellorder reducer');
    console.log(action.payload);
    return Object.assign({}, state, {
      contractInfo: action.payload
    })
  }

  return state
}

export default sellOrderDetailReducer
