import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components';
import './App.css';

const { Content } = Layout;

const App = () => {

  return (
    <Layout>
      <div className="sidebar">
        <Navbar/>
      </div>
      <Layout className="site-layout">
        <Content >
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Homepage/>
              </Route>
              <Route exact path="/exchanges">
                <Exchanges/>
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies/>
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails/>
              </Route>
              <Route exact path="/news">
                <News/>
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App;
