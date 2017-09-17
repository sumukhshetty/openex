import {
  userLoggedIn,
  userLoggedInError,
  updateReduxStoreDataState,
  login
} from '../authBox/loginActions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
// import initialState from '../../src/reducers/initial-state'
// import configureMockStore from 'redux-mock-store'
// import { store } from '../../store'
//
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.mock('../../index.js', () => 'root')

test('a user is logged in', () => {
  const user = { displayName: 'testUser' }
  const expectedAction = {
    type: 'USER_LOGGED_IN',
    payload: user
  }
  expect(userLoggedIn(user)).toEqual(expectedAction)
})

test('a user is not Logged in', () => {
  const expectedAction = {
    type: 'USER_LOGGED_IN',
    payload: undefined
  }
  expect(userLoggedIn()).toEqual(expectedAction)
})

test('login errors are working', () => {
  const error = { error: `This is a silly test` }
  const expectedAction = {
    type: 'USER_LOGGED_IN_ERROR',
    payload: error
  }
  expect(userLoggedInError(error)).toEqual(expectedAction)
})

test('a redux store is available to login module', () => {
  const store = mockStore({ todos: [] })
  const expectedAction = {
    type: 'GET_REDUX_STORE',
    payload: store
  }
  expect(updateReduxStoreDataState(store)).toEqual(expectedAction)
})

xtest('a users account is on the wrong network', () => {
  const web3 = {
    wrongnetwork: true
  }
  const expectedAction = {}
  // how do i detect a toast notification?
  expect(login(web3)).toEqual(expectedAction)
})

xtest('a users account is locked', () => {})
xtest('a login authenticats a user', () => {})
