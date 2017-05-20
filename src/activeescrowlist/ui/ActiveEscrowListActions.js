import {firebaseRef} from './../../index.js';

export const GET_ACTIVE_TRADES = 'GET_ACTIVE_TRADES';
function getActiveTrades (activeTradesPayload) {
  return {
    type: GET_ACTIVE_TRADES,
    payload: activeTradesPayload
  };
}

module.exports = {
  // ISSUE-231-26: this should be called in userActions
  getActiveEscrows: (user) => (dispatch) => {
    firebaseRef.database()
      .ref('/users/' + user.data.uid + '/activeTrades').orderByKey()
      .on('value', function (snapshot) {
        // console.log('snapshot.val() [ActiveEscrowListActions]');
        // console.log(snapshot.val());
        dispatch(getActiveTrades(snapshot.val()));
      });
  }
};
