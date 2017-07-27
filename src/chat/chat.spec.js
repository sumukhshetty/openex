// for these tests to work you need to disable react-ga on index.js line 53 and logpageView on line 96 of index.js

// I imported teh action here so as to not have to disable redner and firebase extenions in teh imported file.

const addMessage = (key, message, tradeId) => {
  return {
    type: 'ADD_MESSAGE',
    content: message.content,
    key,
    timeStamp: message.timeStamp,
    uid: message.uid,
    tradeId
  }
}

test('addMessage', () => {
  expect(
    addMessage(
      11,
      {
        type: 'ADD_MESSAGE',
        content: 'testing addMessage action',
        timeStamp: 11223344556677,
        uid: 9876
      },
      1234
    )
  ).toMatchSnapshot()
})

const createMessage = ({
  content,
  uid,
  tradeId,
  download,
  purchaseRequest
}) => {
  return dispatch => {
    const message = {
      content,
      uid,
      timeStamp: Date.now(),
      download
    }
  }
}

test('createMessage', () => {
  expect(
    addMessage(
      11,
      {
        type: 'ADD_MESSAGE',
        content: 'testing addMessage action',
        timeStamp: 11223344556677,
        uid: 9876
      },
      1234
    )
  ).toMatchSnapshot()
})
