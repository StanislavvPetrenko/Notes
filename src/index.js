import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { initializeStore } from './store';
import App from './containers/App';
import './index.css';

const store = initializeStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
