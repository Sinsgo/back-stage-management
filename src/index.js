import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Router from './router';
import store from './RrR/store';
import { Provider } from 'react-redux';
ReactDOM.render(
  // <Provider>
    <App>
      <Router></Router>
    </App>
  // </Provider>
  
, document.getElementById('root'));


