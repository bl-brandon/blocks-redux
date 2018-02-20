// @flow
import actionTypes from './config/actionTypes';

const { REQUEST, RECEIVE, ERROR } = actionTypes;

type ItemState = {
  data: ?any,
  isFetching: boolean,
  lastUpdated: number,
};

const itemState: ItemState = {
  data: null,
  isFetching: false,
  lastUpdated: 0,
};

/*
 * @name item
 * @description logic responsible for setting the state for the appropriate key
 * @param {object} state  default state
 * @param {object} action params passed in from middlewares
 */
const item = (state: Object = itemState, action: Object) => {
  const { dataType, payload, type } = action;

  switch (type) {
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        data: state.data || dataType,
      });
    case RECEIVE:
      return Object.assign({}, state, {
        isFetching: false,
        data: payload,
        lastUpdated: Date.now(),
      });
    case ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        data: dataType,
      });
    default:
      return state;
  }
};

/*
 * @name default
 * @description logic for mapping key to global store, this uses item.
 * @param {object} state  default state
 * @param {object} action params passed in from middlewares
 */
export default function apiReducer(state: Object = {}, action: Object) {
  const { type, key } = action;

  switch (type) {
    case RECEIVE:
    case ERROR:
    case REQUEST:
      return Object.assign({}, state, {
        [key]: item(state[key], action),
      });
    default:
      return state;
  }
}
