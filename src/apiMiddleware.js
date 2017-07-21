import actionTypes from './config/actionTypes'
import fetchJSON from './fetchJSON'

const {
  CALL_API,
  ERROR,
  RECEIVE,
  REQUEST } = actionTypes

/*
 * @name apiMiddleware
 * @description middleware responsible for handling CALL_API actions
 * @param {object}   action params passed in from action
 * @param {function} next   redux dispatch function
 */
export default function apiMiddleware () {
  return next => action => {
    if (!action.hasOwnProperty(CALL_API)) return next(action)

    const {
      body,
      dataType,
      endpoint,
      headers,
      key,
      method } = action[CALL_API]

    const requestAction = { type: REQUEST, key, dataType }
    const successAction = { type: RECEIVE, key }
    const errorAction = { type: ERROR, key }

    next(requestAction)

    return fetchJSON(endpoint, method, headers, body).then(
      response => next({ ...successAction, payload: response }),
      error => next({ ...errorAction, payload: error })
    )
  }
}
