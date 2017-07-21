import {
  compose,
  createStore,
  applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

export default function configureStore(state, middlewares = [], rootReducer) {
  const loggerMiddleWare = __DEV__ ? createLogger() : null

  const appMiddlewares = [
    thunkMiddleware,
    ...middlewares,
    loggerMiddleWare
  ]

  const store = createStore(
    rootReducer,
    state,
    compose(
      applyMiddleware(...appMiddlewares)
    )
  )

  return store
}
