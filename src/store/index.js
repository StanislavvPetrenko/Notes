import {createStore, applyMiddleware, compose} from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from "redux-thunk";
import rootReducers from './reducers';

export const history = createBrowserHistory();

export const initializeStore = () => createStore(
  rootReducers(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
