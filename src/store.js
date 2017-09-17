import { browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import reducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const routingMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, routingMiddleware))
)

export default store
