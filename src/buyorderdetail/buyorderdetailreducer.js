const initialState = {
  buyOrder: null
}

const buyOrderDetailReducer = (state = initialState, action) => {
  if (action.type === 'GET_BUY_ORDER')
  {
    console.log('in buyorder reducer');
    console.log(action.payload);
    return Object.assign({}, state, {
      buyOrder: action.payload
    })
  }

  return state
}

export default buyOrderDetailReducer
