import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actionCreators from '../store/actions';

class SmartLink extends Component {
  clickHandler = (event) => {
    this.props.onResetRequestSendOrder();

    return true;
  }

  render() {
    return (
      <NavLink onClick={this.clickHandler} {...this.props}>
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

export default connect(undefined, mapDispatchToProps)(SmartLink);
