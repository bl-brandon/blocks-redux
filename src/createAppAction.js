import actionTypes from './config/actionTypes'

const { CALL_APP } = actionTypes

/**
* @name createAppAction
* @description Build action for app calls
* @param {object} action object passed in from action const
*/
export default function createAppAction(action = {}) {
  return {
    [CALL_APP]: {
      ...action
    }
  }
}
