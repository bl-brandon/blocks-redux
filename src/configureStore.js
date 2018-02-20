// @flow
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import apiMiddleware from './apiMiddleware';
import apiReducer from './apiReducer';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(
  state: Object,
  middlewares?: Array<any> = [],
  reducers?: Object = {},
) {
  const loggerMiddleWare = createLogger();
  const appMiddlewares = [thunkMiddleware, apiMiddleware, ...middlewares, loggerMiddleWare];
  const rootReducer = combineReducers({ ...reducers, api: apiReducer });
  const store = createStore(rootReducer, state, compose(applyMiddleware(...appMiddlewares)));

  return store;
}
