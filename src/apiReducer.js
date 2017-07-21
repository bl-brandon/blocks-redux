import actionTypes from './config/actionTypes'

const {
  REQUEST,
  RECEIVE,
  ERROR } = actionTypes

const initialState = {}
const itemState = {
  data: null,
  isFetching: false,
  lastUpdated: 0
}

/*
 * @name item
 * @description logic responsible for setting the state for the appropriate key
 * @param {object} state  default state
 * @param {object} action params passed in from middlewares
 */
const item = (state = itemState, action) => {
  const {
    dataType,
    payload,
    type } = action

  switch (type) {
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        data: state.data || dataType
      })
    case RECEIVE:
      return Object.assign({}, state, {
        isFetching: false,
        data: payload,
        lastUpdated: Date.now()
      })
    case ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        data: dataType
      })
    default:
      return state
  }
}

/*
 * @name default
 * @description logic for mapping key to global store, this uses item.
 * @param {object} state  default state
 * @param {object} action params passed in from middlewares
 */
export default function apiReducer(state = initialState, action) {
  const {
    type,
    key } = action

  switch (type) {
    case RECEIVE:
    case ERROR:
    case REQUEST:
      return Object.assign({}, state, {
        [key]: item(state[key], action)
      })
    default:
      return state
  }
}
