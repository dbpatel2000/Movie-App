import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import  { BrowserRouter as Router } from 'react-router-dom';

//import style
import './index.css';
import App from './app';

//reducer
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <App/>
    </Router>
  </Provider>
  ,document.getElementById('root')
);