
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware, push } from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk'
import { logger, authApiInjector } from '../middleware'
import rootReducer from '../reducers'


export default function configure(initialState, browserHistory) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const middleware = [ thunk, logger, authApiInjector, apiMiddleware, routerMiddleware(browserHistory) ]

  const createStoreWithMiddleware = applyMiddleware(
    ...middleware
  )(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
