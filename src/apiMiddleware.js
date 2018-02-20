// @flow
import actionTypes from './config/actionTypes';
import fetch from 'isomorphic-fetch';

const { CALL_API, ERROR, RECEIVE, REQUEST } = actionTypes;

type Action = {
  CALL_API: {
    body?: Object,
    dataType: any,
    endpoint: string,
    headers?: Object,
    key: string,
    method?: string,
  },
};

/*
 * @name apiMiddleware
 * @description middleware responsible for handling CALL_API actions
 * @param {object}   action params passed in from action
 * @param {function} next   redux dispatch function
 */
export default function apiMiddleware() {
  return (next: any => void) => (action: Action) => {
    if (!Object.prototype.hasOwnProperty.call(action, CALL_API)) return next(action);

    const { body, dataType, endpoint, headers, key, method } = action[CALL_API];

    const requestAction = { type: REQUEST, key, dataType };
    const successAction = { type: RECEIVE, key };
    const errorAction = { type: ERROR, key };

    next(requestAction);

    return fetch(endpoint, { body, headers, method })
      .then(response => response.json())
      .then(json => next({ ...successAction, payload: json }))
      .catch(error => next({ ...errorAction, payload: error }));
  };
}
