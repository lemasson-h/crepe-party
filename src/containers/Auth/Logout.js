import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actionCreators from '../../store/actions';

class Logout extends Component {
  componentDidMount() {
      this.props.onLogout();
  }

  render () {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return null;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.authLogout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
