import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import 'antd/dist/antd.css';

reactDom.render(
  <Router>
      <App/>
  </Router>, 
  document.getElementById('root')
);
