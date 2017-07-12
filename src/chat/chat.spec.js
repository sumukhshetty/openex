import { addMessage } from './actions/messages.js'

xtest('addMessage', () => {
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
