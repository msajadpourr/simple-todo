import React from 'react';
import ReactDOM from 'react-dom';
// Styles
import '../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css';
import './assets/scss/main.scss';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

