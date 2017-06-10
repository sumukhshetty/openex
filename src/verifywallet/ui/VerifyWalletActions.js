function setWalletVerifiedStatus(verifiedBool){
  return {
    type: 'SET_BROWSER_WALLET_VERIFIED_STATUS',
    payload: verifiedBool
  }
}

module.exports = {
  verifyWallet: (result) => (dispatch) => {
    console.log("ui.VerifyWalletActions.verifyWallet")
    dispatch(setWalletVerifiedStatus(result))
  }
}