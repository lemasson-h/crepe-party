import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from './store/actions';
import Admin from './containers/Admin/Admin';
import Homepage from './containers/Homepage';
import Layout from './components/Layout/Layout';
import Login from './containers/Auth/Login';
import Logout from './containers/Auth/Logout';
import NotFound from './components/NotFound/NotFound';
import redirectHoc from './hoc/RedirectHoc';

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
          <Route path="/" exact component={Homepage}/>
          <Route path="/login" component={Login}/>
          {adminRoutes}
          <Route path="/logout" component={Logout} />
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

export default redirectHoc(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
