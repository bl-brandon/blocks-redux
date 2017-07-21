import actionTypes from './config/actionTypes'

const { CALL_API } = actionTypes

/**
* @name createApiAction
* @description Build action for api calls
* @param {object} action object passed in from action const
*/
export default function createApiAction(action = {}) {
  return {
    [CALL_API]: {
      ...action
    }
  }
}
