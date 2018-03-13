import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import * as actionCreators from '../store/actions';

const acceptedProperties = [
  'to',
  'activeClassName',
  'activeStyle',
  'exact',
  'strict',
  'isActive'
];

class SmartLink extends Component {
  resetRequestSendOrder = () => {
    this.props.onResetRequestSendOrder();
  }

  getCleanProps = () => {
    const props = {};

    acceptedProperties.forEach(propertyName => {
      if (undefined !== this.props[propertyName]) {
        props[propertyName] = this.props[propertyName];
      }
    });

    return props;
  }

  render() {
    return (
      <NavLink
        {...this.getCleanProps()}
         onClick={this.resetRequestSendOrder}>
        {this.props.children}
      </NavLink>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetRequestSendOrder: () => dispatch(actionCreators.resetRequestSendOrder()),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(SmartLink));
