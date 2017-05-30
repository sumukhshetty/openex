import {firebaseRef} from './../../index.js';

export const GET_COMPLETED_TRADES = 'GET_COMPLETED_TRADES';
function getCompletedTrades (completedTradesPayload) {
  return {
    type: GET_COMPLETED_TRADES,
    payload: completedTradesPayload
  };
}

module.exports = {
  getCompletedTrades: (user) => (dispatch) => {
    firebaseRef.database()
      .ref('/users/' + user.data.uid + '/completedTrades').orderByKey()
      .on('value', function (snapshot) {
        dispatch(getCompletedTrades(snapshot.val()));
      });
  }
};
