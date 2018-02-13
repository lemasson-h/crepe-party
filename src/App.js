import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from './store/actions';
import Admin from './containers/Admin/Admin';
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
    let adminRoutes = null;

    if (this.props.isAdmin) {
      adminRoutes = <Route path="/admin" component={Admin}/>;
    }

    return (
      <Layout isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin}>
        <Switch>
          <Route path="/" exact component={Command}/>
          <Route path="/menu" component={Menu}/>
          <Route path="/login" component={Login}/>
          {adminRoutes}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.auth.userId === 'EVwVKYrf33PYKoboYeCQP8IW3XJ2',
    isAuthenticated: state.auth.isAuthenticated,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actionCreators.authAutoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
