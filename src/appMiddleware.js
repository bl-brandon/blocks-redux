import actionTypes from './config/actionTypes'

const {
  CALL_APP,
  SET } = actionTypes

/*
 * @name appMiddleware
 * @description middleware responsible for handling CALL_APP actions
 * @param {object}   action params passed in from action
 * @param {function} next   redux dispatch function
 */
export default function appMiddleware () {
  return next => action => {
    if (!action.hasOwnProperty(CALL_APP)) return next(action)

    next({ type: SET, ...action[CALL_APP] })
  }
}
