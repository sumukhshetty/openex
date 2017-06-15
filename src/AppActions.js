export const SET_WEB_3 = 'SET_WEB_3'
function web3Init(web3) {
  return {
  type:SET_WEB_3,
  payload:web3
  }
}

function wrongNetwork(wrongNetworkBool){
  return {
    type: 'GET_WRONG_NETWORK_STATUS',
    payload: wrongNetworkBool
  }
}

module.exports = {
  setWeb3: (web3) => (dispatch) => {
    dispatch(web3Init(web3))
    // TODO change this to mainnet
    try {
      if(web3.version.network==='42'){
        dispatch(wrongNetwork(false))
      } else {
        dispatch(wrongNetwork(true))
      }
    } catch (error) {
      console.log(error)
      dispatch(wrongNetwork(false))
    }
  } 
}