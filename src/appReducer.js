import actionTypes from './config/actionTypes'

const { SET } = actionTypes

/*
 * @name item
 * @description logic responsible for setting the state for the appropriate key
 * @param {object} state  default state
 * @param {object} action params passed in from middlewares
 */
const item = (state = {}, action) => {
  const {
    payload,
    type } = action

  switch (type) {
    case SET:
      return Object.assign({}, state, payload)
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
export default function appReducer(state = {}, action) {
  const { type, key } = action

  switch (type) {
    case 'SET':
      return Object.assign({}, state, {
        [key]: item(state[key], action)
      })
    default:
      return state
  }
}
