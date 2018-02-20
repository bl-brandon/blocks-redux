## Redux API Middleware

A system for generating api state from a simple redux action. Limiting the amount of redux boilerplate code.

### Technologies Used

* Isomorphic-fetch
* Redux
* Redux Thunk

### Getting Started

Make sure you have [Node](https://nodejs.org/en/) (8.9.4) and [Yarn](https://yarnpkg.com/en/) installed before attempting the following steps.

```
  $ git clone git@github.com:hsarb/redux-api-middleware.git
  $ yarn
```

You have access to many processes on the frontend. Choose the most applicable for your needs:

| `npm run ...` | Description                             |
| ------------- | --------------------------------------- |
| clean         | Removes the current build/ folder       |
| compile       | Babel compiles static files into build/ |
| package       | Create build pacakge                    |
| publish       | Publishes the packages to npm           |

### Usage

Everything will be setup via `configureStore`. Import the function and pass in your inital state, additional middlewares and reducers, then pass it into your provider.

A base example:

```
import configureStore from '.../configureStore';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, [ routerMiddleware(browserHistory) ], { ...reducers });

render(
  <Provider store={store} />
);
```

**Actions**

Adding to the api store in redux is as simple as calling an action. This action will trigger the middleware to add to an existing key or create a new one. This will then trigger a request and will add the response to the key in the redux store.

```
import createAction from '../createAppAction'

const myAPIAction = () => createAction({
  dataType: [],
  endpoint: 'http://api.api.com/api',
  key: 'todo',
  method: 'GET'
})
```

Expected object paramaters for createAction:

```
{
  key: '',       # Key used by reducer to set data in global store
  endpoint: '',  # API endpoint
  method: 'GET', # API method
  dataType: {}   # Expected datatype from response
}
```
