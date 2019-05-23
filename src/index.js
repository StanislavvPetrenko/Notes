import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { initializeStore } from './store';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';

const store = initializeStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
