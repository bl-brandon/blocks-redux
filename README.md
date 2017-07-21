# Blocks-redux

A system for generating state from simple redux actions. Limiting the amount of redux boilerplate code.

## Prerequisites

- Node 6.5.0
- Npm 3.10.1

## Technologies Used

- Isomorphic-fetch
- Redux
- Redux Thunk

## Installation

```
  npm install --save blocks-redux
```

#### Building the code

```
  npm install
```

You have access to many processes on the frontend. Choose the most applicable for your needs:

|`npm run ...`|Description|
|------------------|-----------|
|clean|Removes the current build/ folder|
|compile|Babel compiles static files into build/|
|package|Create build pacakge|
|publish|Publishes the packages to npm|

#### Usage

We need to create a main root reducer that will combine our other reducers. This root reducer will then be inject into our store. This store will also need to take in an initial state and any middlewares that we may want to use in our redux state.

A base example:

```
import appMiddleware from 'blocks-redux/appMiddleware'
import appReducer from 'blocks-redux/appReducer'
import createRootReducer from 'blocks-redux/createRootReducer'
import configureStore from 'blocks-redux/configureStore'

const initialState = window.__INITIAL_STATE__
const rootReducer = createRootReducer({ app: appReducer, routing: routerReducer })
const store = configureStore(initialState, [ appMiddleware, routerMiddleware(browserHistory) ], rootReducer)
```

**Reducers**

Expects an object of mapped reducers. We have created reducers that you can leverage if you wish. These reducers are responsible for the app state and the api state.

Accessing the reducers:

```
import appReducer from 'blocks-redux/appReducer'
import apiReducer from 'blocks-redux/apiReducer'
```

**createRootReducer**

createRootReducer will combine any reducer that is assign in the object passing into the function.

Using createRootReducer:

```
import createRootReducer from 'blocks-redux/createRootReducer'

const rootReducer = createRootReducer({ app: appReducer, routing: routerReducer })
```

**configureStore**

configureStore will compose a redux store using the initialState, middlewares and rootReducer passed into it.

```
import appMiddleware from 'blocks-redux/appMiddleware'
import appReducer from 'blocks-redux/appReducer'
import createRootReducer from 'blocks-redux/createRootReducer'
import configureStore from 'blocks-redux/configureStore'

const initialState = window.__INITIAL_STATE__
const rootReducer = createRootReducer({ app: appReducer, routing: routerReducer })
const store = configureStore(initialState, [ appMiddleware, routerMiddleware(browserHistory) ], rootReducer)
```

**Action Handlers**

There are action handlers that will aid in injecting any action into the correct state. If that state is not currently there, these action will trigger the appropriate reducer to create a new state for that action.

```
import createAppAction from 'blocks-redux/createAppAction'
import createApiAction from 'blocks-redux/createApiAction'

createApiAction({
  dataType: [],
  endpoint: 'http://api.api.com/api',
  key: 'todo',
  method: 'GET'  
})

createAppAction({
  key: 'todo',
  payload: {
    hello: 'world'
  }
})
```

Expected object paramaters for createApiAction:

```
{
  key: '',       # Key used by reducer to set data in global store
  endpoint: '',  # API endpoint
  method: 'GET', # API method
  dataType: {}   # Expected datatype from response
}
```

Expected object paramaters for createAppAction:

```
{
  key: '',                        # Key used by reducer to set data in global store
  payload: '' || {} || [] || bool # Payload to store in the global store
}
```
