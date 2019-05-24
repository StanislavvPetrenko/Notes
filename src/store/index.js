import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createHashHistory } from 'history';
import rootReducers from './reducers';

export const history = createHashHistory();

// export const initializeStore = () => createStore(
//   rootReducers(history),
//   compose(
//     applyMiddleware(
//       routerMiddleware(history),
//       thunk
//     ),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const composeEnhancers = typeof window === 'object'
      && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    thunk
  ),
  // other store enhancers if any
);

export const initializeStore = () => createStore(
  rootReducers(history),
  enhancer
);

