import { combineReducers } from 'redux'

export default function createRootReducer(reducers = {}) {
  return combineReducers(reducers)
}
