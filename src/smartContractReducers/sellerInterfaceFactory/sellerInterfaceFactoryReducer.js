const initialState = {
  data: null
}

const sellerInterfaceFactoryReducer = (state = initialState, action) => {
  if (action.type === "SELLER_INTERFACE_FACTORY")
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  return state
}

export default sellerInterfaceFactoryReducer
