import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from './store/actions';
import Command from './containers/Command';
import Layout from './components/Layout/Layout';
import Login from './containers/Auth/Login';
import Menu from './containers/Menu';
import NotFound from './components/NotFound/NotFound';

class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin();
  }

  render() {
    return (
      <Layout isAuthenticated={this.props.isAuthenticated}>
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actionCreators.authAutoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
