import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Command from './containers/Command';
import Layout from './components/Layout/Layout';
import Login from './containers/Login';
import Menu from './containers/Menu';
import NotFound from './components/NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Command}/>
          <Route path="/menu" component={Menu}/>
          <Route path="/login" component={Login}/>
          <Route component={NotFound} />
        </Switch>
        <p>Echo</p>
      </Layout>
    );
  }
}

export default App;
