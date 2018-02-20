// @flow
import actionTypes from './config/actionTypes';

const { CALL_API } = actionTypes;

type Action = {
  body?: Object,
  dataType: any,
  endpoint: string,
  headers?: Object,
  key: string,
  method?: string,
};

/**
 * @name createAction
 * @description Build action for api calls
 * @param {object} action object passed in from action const
 */
export default function createAction(action: Action) {
  return {
    [CALL_API]: {
      ...action,
    },
  };
}
