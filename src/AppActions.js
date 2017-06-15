export const SET_WEB_3 = 'SET_WEB_3'
function web3Init(web3) {
  return {
  type:SET_WEB_3,
  payload:web3
  }
}

module.exports = {
  setWeb3: (web3) => (dispatch) => {
    dispatch(web3Init(web3))
  } 
}