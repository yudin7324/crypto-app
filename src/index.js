import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import 'antd/dist/antd.css';
import store from './app/store';
import { Provider } from 'react-redux';

reactDom.render(
  <Router>
    <Provider store={store}>
      <App/>
    </Provider> 
  </Router>, 
  document.getElementById('root')
);
